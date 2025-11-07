import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Cashback = () => {
  const benefits = [
    {
      icon: 'Percent',
      title: '3% кешбэк',
      description: 'На все покупки билетов и отелей',
    },
    {
      icon: 'Coins',
      title: 'Быстрый вывод',
      description: 'Используйте кешбэк для следующих покупок',
    },
    {
      icon: 'TrendingUp',
      title: 'Без ограничений',
      description: 'Накапливайте кешбэк без лимитов',
    },
    {
      icon: 'Gift',
      title: 'Бонусы',
      description: 'Специальные предложения для участников',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              DukeAir Cashback 3%
            </h1>
            <p className="text-xl text-gray-600">
              Получайте деньги обратно с каждой покупки
            </p>
          </div>

          <Card className="mb-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white animate-scale-in">
            <CardContent className="p-12 text-center">
              <Icon name="Gift" className="mx-auto mb-6" size={80} />
              <h2 className="text-4xl font-bold mb-4">
                Станьте участником программы
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Регистрация бесплатная и занимает всего минуту
              </p>
              <Button size="lg" variant="secondary" className="hover-scale">
                Получить кешбэк
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-sky-100 p-3 rounded-lg">
                      <Icon name={benefit.icon} className="text-sky-500" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Как это работает?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Регистрация</h3>
                    <p className="text-gray-600">
                      Зарегистрируйтесь в программе DukeAir Cashback бесплатно
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Покупки</h3>
                    <p className="text-gray-600">
                      Бронируйте билеты и отели как обычно
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Кешбэк</h3>
                    <p className="text-gray-600">
                      Получайте 3% от стоимости каждой покупки на ваш счёт
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-sky-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Использование</h3>
                    <p className="text-gray-600">
                      Оплачивайте следующие покупки накопленным кешбэком
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Cashback;
