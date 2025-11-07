import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Trains = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="animate-scale-in">
            <CardContent className="p-12">
              <Icon name="Train" className="mx-auto mb-4 text-emerald-500" size={64} />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">ЖД билеты</h1>
              <p className="text-gray-600">Раздел находится в разработке</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Trains;
