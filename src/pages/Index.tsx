import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const Index = () => {
  const [date, setDate] = useState<Date>();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const services = [
    { title: 'Авиабилеты', icon: 'Plane', link: '/flights', color: 'bg-sky-500' },
    { title: 'ЖД билеты', icon: 'Train', link: '/trains', color: 'bg-emerald-500' },
    { title: 'Автобусы', icon: 'Bus', link: '/buses', color: 'bg-orange-500' },
    { title: 'Отели', icon: 'Hotel', link: '/hotels', color: 'bg-purple-500' },
    { title: 'Электрички', icon: 'TrainTrack', link: '/suburban', color: 'bg-teal-500' },
    { title: 'Туры', icon: 'Palmtree', link: '/tours', color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Укажите маршрут, чтобы найти дешёвые билеты
            </h1>
            <p className="text-xl text-gray-600">
              Быстрое бронирование авиабилетов, отелей и многого другого
            </p>
          </div>

          <Card className="mb-12 shadow-xl animate-scale-in">
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

              <Link to="/flights">
                <Button className="w-full h-14 text-lg bg-sky-500 hover:bg-sky-600">
                  <Icon name="Search" className="mr-2" size={20} />
                  Найти авиабилеты
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Все сервисы</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <Link key={service.title} to={service.link}>
                  <Card className="hover-scale cursor-pointer transition-all hover:shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardContent className="p-6 text-center">
                      <div className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <Icon name={service.icon} className="text-white" size={32} />
                      </div>
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white animate-fade-in">
            <CardContent className="p-8 text-center">
              <Icon name="Gift" className="mx-auto mb-4" size={48} />
              <h2 className="text-3xl font-bold mb-2">DukeAir Cashback 3%</h2>
              <p className="text-lg mb-6 opacity-90">
                Получайте кешбэк с каждой покупки билетов и отелей
              </p>
              <Link to="/cashback">
                <Button size="lg" variant="secondary" className="hover-scale">
                  Подробнее о программе
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Plane" size={28} />
                <span className="text-xl font-bold">DukeAir</span>
              </div>
              <p className="text-gray-400">
                Современный сервис бронирования билетов и отелей
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Сервисы</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/flights" className="hover:text-white">Авиабилеты</Link></li>
                <li><Link to="/trains" className="hover:text-white">ЖД билеты</Link></li>
                <li><Link to="/hotels" className="hover:text-white">Отели</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">О нас</a></li>
                <li><a href="#" className="hover:text-white">Контакты</a></li>
                <li><Link to="/cashback" className="hover:text-white">Cashback 3%</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Подписка</h3>
              <p className="text-gray-400 mb-4">Получайте лучшие предложения</p>
              <div className="flex space-x-2">
                <Input placeholder="Email" className="bg-gray-800 border-gray-700" />
                <Button variant="secondary">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 DukeAir. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;