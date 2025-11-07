import { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Вход в личный кабинет</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full bg-sky-500 hover:bg-sky-600">
                  Войти
                </Button>
                <p className="text-center text-sm text-gray-600">
                  Нет аккаунта? <a href="#" className="text-sky-500 hover:underline">Зарегистрироваться</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Здравствуйте!</h1>
            <p className="text-gray-600">Добро пожаловать в личный кабинет</p>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="bookings" className="flex items-center space-x-2">
                <Icon name="Ticket" size={18} />
                <span>Мои бронирования</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <Icon name="User" size={18} />
                <span>Профиль</span>
              </TabsTrigger>
              <TabsTrigger value="cashback" className="flex items-center space-x-2">
                <Icon name="Gift" size={18} />
                <span>Cashback</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="animate-fade-in">
              <Card>
                <CardContent className="p-12 text-center">
                  <Icon name="Inbox" className="mx-auto mb-4 text-gray-400" size={64} />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    У вас пока нет билетов
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Забронируйте авиабилет, отель или тур, и они появятся здесь
                  </p>
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    Найти билеты
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Личные данные</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Имя</Label>
                      <Input placeholder="Иван" className="mt-1" />
                    </div>
                    <div>
                      <Label>Фамилия</Label>
                      <Input placeholder="Иванов" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} className="mt-1" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (999) 123-45-67" className="mt-1" />
                  </div>
                  <Button className="bg-sky-500 hover:bg-sky-600">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cashback" className="animate-fade-in">
              <Card className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Доступный кешбэк</p>
                      <p className="text-4xl font-bold">0 ₽</p>
                    </div>
                    <Icon name="Gift" size={64} className="opacity-20" />
                  </div>
                  <p className="opacity-90">
                    Совершайте покупки и получайте 3% кешбэк на все услуги DukeAir
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Account;
