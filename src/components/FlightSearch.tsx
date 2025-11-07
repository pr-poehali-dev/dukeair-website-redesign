import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const FlightSearch = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSearch = () => {
    if (from && to) {
      navigate(`/flights?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    }
  };

  return (
    <Card className="shadow-xl animate-scale-in">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Откуда</label>
            <Input
              placeholder="Москва"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Куда</label>
            <Input
              placeholder="Стамбул"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Дата вылета</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full h-12 justify-start text-left">
                  <Icon name="Calendar" className="mr-2" size={18} />
                  {date ? format(date, 'dd MMM yyyy', { locale: ru }) : 'Выберите дату'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} locale={ru} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-1">
            <label className="text-sm font-medium text-gray-700 mb-2 block">Класс</label>
            <Select defaultValue="economy">
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="economy">Эконом</SelectItem>
                <SelectItem value="comfort">Комфорт</SelectItem>
                <SelectItem value="business">Бизнес</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSearch} className="w-full h-14 text-lg bg-sky-500 hover:bg-sky-600">
          <Icon name="Search" className="mr-2" size={20} />
          Найти авиабилеты
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlightSearch;
