import raw from './dpmSchedule.json';

// Generated from the Detroit Transportation Corporation's official GTFS feed:
// https://hosted-gtfs-feeds.s3.amazonaws.com/DPM/gtfs.zip — scheduled times, not live arrivals.
type Schedule = { calendar: { id: string; days: number[]; start: string; end: string }[]; exceptions: { id: string; date: string; type: number }[]; departures: Record<string, Record<string, number[]>> };
const schedule = raw as Schedule;
const regular = new Set(['weekday', 'saturday', 'sunday']);

function detroitNow(now = new Date()) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Detroit', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(p => [p.type, p.value]));
  const ymd = `${parts['year']}${parts['month']}${parts['day']}`;
  return { ymd, seconds: Number(parts['hour']) * 3600 + Number(parts['minute']) * 60 + Number(parts['second']) };
}
const shiftDate = (ymd: string, days: number) => { const d = new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8) + days)); return d.toISOString().slice(0, 10).replace(/-/g, ''); };
const weekday = (ymd: string) => (new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8))).getUTCDay() + 6) % 7;

export function servicesOn(ymd: string) {
  const active = new Set(schedule.calendar.filter(c => c.start <= ymd && c.end >= ymd && c.days.includes(weekday(ymd))).map(c => c.id));
  for (const e of schedule.exceptions) if (e.date === ymd) { if (e.type === 1) active.add(e.id); else active.delete(e.id); }
  return [...active];
}

const fmt = (ymd: string, seconds: number) => {
  const h = Math.floor(seconds / 3600) % 24, m = Math.floor(seconds / 60) % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
const label = (ymd: string) => new Date(Date.UTC(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8), 12)).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });

export type NextTrain = { time: string; minutes: number; day: string | null };
export function stationSchedule(stationId: string, now = new Date()) {
  const { ymd, seconds } = detroitNow(now);
  const trains: NextTrain[] = [];
  let running = false;
  // Yesterday's service can run past midnight (GTFS times above 24:00).
  for (const offset of [-1, 0, 1, 2]) {
    const day = shiftDate(ymd, offset);
    const nowInDay = seconds - offset * 86400;
    for (const id of servicesOn(day)) {
      const times = schedule.departures[id]?.[stationId] ?? [];
      if (times.length && nowInDay >= (times[0] ?? 0) - 60 && nowInDay <= (times[times.length - 1] ?? 0)) running = true;
      for (const t of times) if (t >= nowInDay) trains.push({ time: fmt(day, t), minutes: Math.round((t - nowInDay) / 60), day: t - nowInDay > 3600 * 6 || offset > 0 && t < 86400 ? label(day) : null });
    }
    if (trains.length >= 4) break;
  }
  trains.sort((a, b) => a.minutes - b.minutes);
  const specialToday = servicesOn(ymd).some(id => !regular.has(id));
  const specialDays = [...new Set(schedule.exceptions.filter(e => e.type === 1 && e.date >= ymd).map(e => e.date))].sort().map(label);
  return { running, trains: trains.slice(0, 4), specialToday, specialDays };
}
