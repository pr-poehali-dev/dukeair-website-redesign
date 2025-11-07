import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/flights', label: 'Авиабилеты', icon: 'Plane' },
    { path: '/trains', label: 'ЖД билеты', icon: 'Train' },
    { path: '/buses', label: 'Автобусы', icon: 'Bus' },
    { path: '/hotels', label: 'Отели', icon: 'Hotel' },
    { path: '/suburban', label: 'Электрички', icon: 'TrainTrack' },
    { path: '/tours', label: 'Туры', icon: 'Palmtree' },
  ];

  return (
    <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <Icon name="Plane" className="text-sky-500" size={32} />
            <span className="text-2xl font-bold text-gray-900">DukeAir</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? 'default' : 'ghost'}
                  className="flex items-center space-x-2"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>

          <Link to="/account">
            <Button className="flex items-center space-x-2">
              <Icon name="User" size={18} />
              <span className="hidden md:inline">Войти</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
