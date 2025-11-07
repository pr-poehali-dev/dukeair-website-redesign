
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Flights from "./pages/Flights";
import Trains from "./pages/Trains";
import Buses from "./pages/Buses";
import Hotels from "./pages/Hotels";
import Suburban from "./pages/Suburban";
import Tours from "./pages/Tours";
import Account from "./pages/Account";
import Cashback from "./pages/Cashback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/suburban" element={<Suburban />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cashback" element={<Cashback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;