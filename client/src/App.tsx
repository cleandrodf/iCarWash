import {
  ArrowRight,
  CalendarDays,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Crosshair,
  Home,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  X,
} from "lucide-react";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import type {
  AvailableSlot,
  NearbyPartner,
  ServiceMode,
  ServiceOffer,
} from "@shared/contracts";
import { createBooking, findNearbyPartners } from "./api";

const BRASILIA = { latitude: -15.793889, longitude: -47.882778 };

type BookingSelection = {
  partner: NearbyPartner;
  service: ServiceOffer;
  slot: AvailableSlot;
};

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
});

const formatSlot = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

const modeLabel: Record<ServiceMode, string> = {
  onsite: "No estabelecimento",
  mobile: "No meu endereço",
};

function App() {
  const [mode, setMode] = useState<ServiceMode | undefined>();
  const [location, setLocation] = useState(BRASILIA);
  const [locationLabel, setLocationLabel] = useState("Região central de Brasília");
  const [partners, setPartners] = useState<NearbyPartner[]>([]);
  const [source, setSource] = useState<"database" | "demo">("demo");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [locationBusy, setLocationBusy] = useState(false);
  const [booking, setBooking] = useState<BookingSelection>();

  const loadPartners = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await findNearbyPartners(location.latitude, location.longitude, mode);
      setPartners(result.partners);
      setSource(result.source);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Falha ao buscar parceiros.");
    } finally {
      setLoading(false);
    }
  }, [location, mode]);

  useEffect(() => {
    void loadPartners();
  }, [loadPartners]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Seu navegador não oferece acesso à localização.");
      return;
    }

    setLocationBusy(true);
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLabel("Sua localização atual");
        setLocationBusy(false);
      },
      () => {
        setError("Não foi possível acessar sua localização. Mantivemos o centro de Brasília.");
        setLocationBusy(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  const resultText = useMemo(() => {
    if (loading) return "Buscando opções próximas…";
    if (partners.length === 0) return "Nenhum parceiro encontrado";
    return `${partners.length} ${partners.length === 1 ? "opção próxima" : "opções próximas"}`;
  }, [loading, partners.length]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="LavaMarket — início">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span>Lava<span>Market</span></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#como-funciona">Como funciona</a>
          <button className="partner-link">Sou parceiro <ChevronRight size={16} /></button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Marketplace automotivo de Brasília</p>
            <h1>Seu carro limpo.<br /><em>Seu tempo, livre.</em></h1>
            <p className="hero-description">
              Encontre profissionais bem avaliados perto de você e agende no estabelecimento
              ou no seu endereço.
            </p>
            <div className="trust-row">
              <span><ShieldCheck size={18} /> Parceiros verificados</span>
              <span><CalendarDays size={18} /> Horários em tempo real</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="sun-disc" />
            <div className="road-lines" />
            <div className="car-illustration">
              <div className="car-shine shine-one" />
              <div className="car-shine shine-two" />
              <CarFront size={142} strokeWidth={1.15} />
            </div>
            <div className="floating-card card-rating">
              <Star size={16} fill="currentColor" />
              <strong>4,9</strong>
              <span>média dos parceiros</span>
            </div>
            <div className="floating-card card-nearby">
              <MapPin size={18} />
              <div><strong>2,3 km</strong><span>mais próximo</span></div>
            </div>
          </div>

          <div className="search-panel" id="servicos">
            <div className="location-field">
              <span className="field-icon"><MapPin size={21} /></span>
              <div>
                <label>Sua localização</label>
                <strong>{locationLabel}</strong>
              </div>
              <button onClick={useCurrentLocation} disabled={locationBusy}>
                {locationBusy ? <LoaderCircle className="spin" size={18} /> : <Crosshair size={18} />}
                Usar localização
              </button>
            </div>
            <div className="mode-field">
              <label>Onde prefere o serviço?</label>
              <div className="mode-buttons">
                <button className={mode === undefined ? "active" : ""} onClick={() => setMode(undefined)}>
                  Ambos
                </button>
                <button className={mode === "onsite" ? "active" : ""} onClick={() => setMode("onsite")}>
                  <Store size={17} /> No local
                </button>
                <button className={mode === "mobile" ? "active" : ""} onClick={() => setMode("mobile")}>
                  <Home size={17} /> No endereço
                </button>
              </div>
            </div>
            <button className="primary-search" onClick={() => void loadPartners()}>
              Ver serviços <ArrowRight size={19} />
            </button>
          </div>
        </section>

        <section className="results-section">
          <div className="results-heading">
            <div>
              <p className="section-kicker">Perto de você</p>
              <h2>{resultText}</h2>
            </div>
            <p>Ordenadas pela distância aproximada até sua localização.</p>
          </div>

          {source === "demo" && !loading && (
            <div className="demo-note">
              <span>Ambiente demonstrativo</span>
              Configure o banco Neon para persistir parceiros e agendamentos reais.
            </div>
          )}

          {error && <div className="error-banner">{error}</div>}

          <div className="partner-grid">
            {loading
              ? Array.from({ length: 3 }, (_, index) => <div className="partner-card skeleton" key={index} />)
              : partners.map((partner, index) => (
                  <PartnerCard
                    key={partner.id}
                    partner={partner}
                    index={index}
                    onBook={setBooking}
                  />
                ))}
          </div>
        </section>

        <section className="how-section" id="como-funciona">
          <div>
            <p className="section-kicker">Simples, do começo ao brilho</p>
            <h2>Três passos. Sem troca de mensagens intermináveis.</h2>
          </div>
          <ol>
            <li><span>01</span><strong>Escolha</strong><p>Compare distância, preço, avaliação e modalidade.</p></li>
            <li><span>02</span><strong>Agende</strong><p>Selecione um horário liberado pelo próprio parceiro.</p></li>
            <li><span>03</span><strong>Confirme</strong><p>O parceiro confirma e você paga diretamente no atendimento.</p></li>
          </ol>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>Lava<span>Market</span></span>
        </a>
        <p>MVP piloto para Brasília — DF</p>
      </footer>

      {booking && <BookingDialog selection={booking} onClose={() => setBooking(undefined)} />}
    </div>
  );
}

function PartnerCard({
  partner,
  index,
  onBook,
}: {
  partner: NearbyPartner;
  index: number;
  onBook: (selection: BookingSelection) => void;
}) {
  const [serviceId, setServiceId] = useState(partner.services[0]?.id);
  const [slotId, setSlotId] = useState(partner.slots[0]?.id);
  const service = partner.services.find(item => item.id === serviceId) ?? partner.services[0];
  const slot = partner.slots.find(item => item.id === slotId) ?? partner.slots[0];
  const themes = ["clay", "sage", "navy"];

  return (
    <article className={`partner-card ${themes[index % themes.length]}`}>
      <div className="partner-image">
        <div className="texture" />
        <CarFront size={72} strokeWidth={1.25} />
        <span className="distance-pill"><MapPin size={14} /> {partner.distanceKm.toFixed(1)} km</span>
        {partner.featured && <span className="featured-pill">Recomendado</span>}
      </div>
      <div className="partner-content">
        <div className="partner-title-row">
          <div>
            <h3>{partner.name}</h3>
            <p>{partner.neighborhood} · {partner.region}</p>
          </div>
          <span className="rating"><Star size={14} fill="currentColor" /> {partner.rating.toFixed(1)}</span>
        </div>
        <p className="partner-description">{partner.description}</p>
        <div className="mode-tags">
          {partner.modes.map(item => (
            <span key={item}>{item === "onsite" ? <Store size={14} /> : <Home size={14} />}{modeLabel[item]}</span>
          ))}
        </div>

        <label className="select-label">
          Serviço
          <select value={serviceId} onChange={event => setServiceId(event.target.value)}>
            {partner.services.map(item => (
              <option key={item.id} value={item.id}>{item.name} — {currency.format(item.price)}</option>
            ))}
          </select>
        </label>

        <div className="slot-row" aria-label="Próximos horários">
          {partner.slots.slice(0, 3).map(item => (
            <button
              key={item.id}
              className={slotId === item.id ? "selected" : ""}
              onClick={() => setSlotId(item.id)}
            >
              <Clock3 size={13} /> {formatSlot(item.startsAt)}
            </button>
          ))}
        </div>

        <div className="card-footer">
          <div><small>A partir de</small><strong>{currency.format(service?.price ?? partner.startingPrice)}</strong></div>
          <button
            disabled={!service || !slot}
            onClick={() => service && slot && onBook({ partner, service, slot })}
          >
            Solicitar horário <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

function BookingDialog({ selection, onClose }: { selection: BookingSelection; onClose: () => void }) {
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    vehicleDescription: "",
    serviceAddress: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();
  const [bookingId, setBookingId] = useState<string>();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(undefined);

    try {
      const result = await createBooking({
        partnerId: selection.partner.id,
        partnerServiceId: selection.service.id,
        slotId: selection.slot.id,
        mode: selection.service.mode,
        ...form,
      });
      setBookingId(result.bookingId);
      setMessage(result.message);
    } catch (requestError) {
      setMessage(requestError instanceof Error ? requestError.message : "Falha ao solicitar o horário.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="booking-dialog" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="dialog-close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        {bookingId ? (
          <div className="success-state">
            <span><Check size={34} /></span>
            <p className="section-kicker">Solicitação recebida</p>
            <h2 id="booking-title">Agora é com o parceiro.</h2>
            <p>{message}</p>
            <div className="booking-code">Código <strong>{bookingId.slice(-8).toUpperCase()}</strong></div>
            <button className="dialog-primary" onClick={onClose}>Voltar às opções</button>
          </div>
        ) : (
          <>
            <p className="section-kicker">Solicitar agendamento</p>
            <h2 id="booking-title">Confirme seus dados</h2>
            <div className="booking-summary">
              <div><strong>{selection.partner.name}</strong><span>{selection.partner.neighborhood}</span></div>
              <div><strong>{selection.service.name}</strong><span>{modeLabel[selection.service.mode]}</span></div>
              <div><strong>{formatSlot(selection.slot.startsAt)}</strong><span>{currency.format(selection.service.price)} · pagamento no local</span></div>
            </div>
            <form onSubmit={submit}>
              <div className="form-grid">
                <label>Nome completo<input required minLength={3} value={form.customerName} onChange={event => setForm({ ...form, customerName: event.target.value })} /></label>
                <label>Telefone<input required minLength={8} placeholder="(61) 99999-9999" value={form.customerPhone} onChange={event => setForm({ ...form, customerPhone: event.target.value })} /></label>
              </div>
              <label>Seu veículo<input required placeholder="Ex.: Honda Civic branco" value={form.vehicleDescription} onChange={event => setForm({ ...form, vehicleDescription: event.target.value })} /></label>
              {selection.service.mode === "mobile" && (
                <label>Endereço do atendimento<input required placeholder="Quadra, conjunto, lote e complemento" value={form.serviceAddress} onChange={event => setForm({ ...form, serviceAddress: event.target.value })} /></label>
              )}
              <label>Observações <span>(opcional)</span><textarea rows={3} value={form.notes} onChange={event => setForm({ ...form, notes: event.target.value })} /></label>
              {message && <div className="form-message">{message}</div>}
              <button className="dialog-primary" type="submit" disabled={submitting}>
                {submitting ? <><LoaderCircle className="spin" size={18} /> Enviando…</> : <>Enviar solicitação <ArrowRight size={18} /></>}
              </button>
              <small className="form-footnote">O horário ficará pendente até a confirmação do parceiro.</small>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
