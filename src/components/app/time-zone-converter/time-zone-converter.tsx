'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Clock, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import TimezoneSelect from 'react-timezone-select';
import type { ITimezone } from 'react-timezone-select';

interface TimeZoneItem {
  id: number;
  tz: ITimezone;
}

export function TimeZoneConverter() {
  const [baseDate, setBaseDate] = useState<Date>(new Date());
  const [time, setTime] = useState(format(new Date(), 'HH:mm'));
  const [timezones, setTimezones] = useState<TimeZoneItem[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    // Add user's local timezone on initial load
    const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    addTimezone(userTz);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(baseDate);
    if (!isNaN(hours) && !isNaN(minutes)) {
      newDate.setHours(hours, minutes);
      setBaseDate(newDate);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const addTimezone = (tzValue?: string) => {
    const newTimezone: TimeZoneItem = {
      id: nextId,
      tz: tzValue || 'Europe/London',
    };
    setTimezones([...timezones, newTimezone]);
    setNextId(nextId + 1);
  };

  const removeTimezone = (id: number) => {
    setTimezones(timezones.filter(tz => tz.id !== id));
  };

  const handleTimezoneChange = (id: number, newTz: ITimezone) => {
    setTimezones(timezones.map(tz => (tz.id === id ? { ...tz, tz: newTz } : tz)));
  };

  const getFormattedTime = (date: Date, tz: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  const getFormattedDate = (date: Date, tz: string) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getOffset = (date: Date, tz: string) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      timeZoneName: 'longOffset',
    });
    const parts = formatter.formatToParts(date);
    const gmtPart = parts.find(part => part.type === 'timeZoneName');
    return gmtPart ? gmtPart.value : '';
  };


  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg bg-card border-primary/20 animate-fade-in">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Time Zone Converter</CardTitle>
        <CardDescription>
          Select a date and time, then add timezones to compare.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(baseDate, 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={baseDate}
                onSelect={(date) => date && setBaseDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="relative w-full">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {timezones.map(tzItem => (
            <div key={tzItem.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg items-center">
              <div className="md:col-span-1">
                <TimezoneSelect
                   value={tzItem.tz}
                   onChange={(newTz) => handleTimezoneChange(tzItem.id, newTz)}
                   styles={{
                    control: (base) => ({...base, background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))'}),
                    menu: (base) => ({...base, background: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }),
                    option: (base, state) => ({...base, backgroundColor: state.isFocused ? 'hsl(var(--accent))' : 'transparent'}),
                    singleValue: (base) => ({...base, color: 'hsl(var(--foreground))'})
                   }}
                />
                <p className="text-xs text-muted-foreground mt-1">{getOffset(baseDate, typeof tzItem.tz === 'string' ? tzItem.tz : tzItem.tz.value)}</p>
              </div>
              <div className="md:col-span-2 flex items-center justify-between">
                <div className="text-right">
                    <p className="text-3xl font-bold">{getFormattedTime(baseDate, typeof tzItem.tz === 'string' ? tzItem.tz : tzItem.tz.value)}</p>
                    <p className="text-muted-foreground">{getFormattedDate(baseDate, typeof tzItem.tz === 'string' ? tzItem.tz : tzItem.tz.value)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeTimezone(tzItem.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button onClick={() => addTimezone()} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Timezone
        </Button>
      </CardContent>
    </Card>
  );
}
