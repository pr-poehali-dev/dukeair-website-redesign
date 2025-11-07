import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Flights = () => {
  const flights = [
    {
      id: 1,
      airline: 'Duke Air',
      flight: 'DU-102',
      from: 'Москва (SVO)',
      to: 'Стамбул (IST)',
      departure: '10:00',
      arrival: '13:55',
      duration: '3ч 55м',
      class: 'Эконом',
      price: 12500,
    },
    {
      id: 2,
      airline: 'Duke Air',
      flight: 'DU-205',
      from: 'Москва (SVO)',
      to: 'Стамбул (IST)',
      departure: '14:30',
      arrival: '18:25',
      duration: '3ч 55м',
      class: 'Эконом',
      price: 14200,
    },
    {
      id: 3,
      airline: 'Duke Air',
      flight: 'DU-308',
      from: 'Москва (SVO)',
      to: 'Стамбул (IST)',
      departure: '19:15',
      arrival: '23:10',
      duration: '3ч 55м',
      class: 'Бизнес',
      price: 28900,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Москва → Стамбул</h1>
            <p className="text-gray-600">08 ноября 2025 • Найдено {flights.length} рейса</p>
          </div>

          <div className="space-y-4">
            {flights.map((flight, index) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon name="Plane" className="text-sky-500" size={24} />
                        <div>
                          <p className="font-semibold text-gray-900">{flight.airline}</p>
                          <p className="text-sm text-gray-500">Рейс {flight.flight}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div>
                          <p className="text-3xl font-bold text-gray-900">{flight.departure}</p>
                          <p className="text-sm text-gray-600">{flight.from}</p>
                        </div>

                        <div className="flex-1 flex items-center">
                          <div className="flex-1 border-t-2 border-gray-300 relative">
                            <Icon name="Plane" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={20} />
                          </div>
                          <p className="text-sm text-gray-500 mx-4">{flight.duration}</p>
                        </div>

                        <div>
                          <p className="text-3xl font-bold text-gray-900">{flight.arrival}</p>
                          <p className="text-sm text-gray-600">{flight.to}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-4">
                        <Badge variant="secondary">{flight.class}</Badge>
                        <Button variant="ghost" size="sm" className="text-sky-500">
                          <Icon name="Plus" size={16} className="mr-1" />
                          Добавить багаж
                        </Button>
                      </div>
                    </div>

                    <div className="text-right ml-8">
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {flight.price.toLocaleString()} ₽
                      </p>
                      <Button className="bg-sky-500 hover:bg-sky-600">
                        Выбрать билет
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Flights;
