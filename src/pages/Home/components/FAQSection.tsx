"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "¿Necesito saber de tecnología?",
      a: "No, yo me encargo de todo. Tú solo me dices qué platos tienes y cómo quieres que se vea.",
    },
    {
      q: "¿Puedo actualizar los precios yo mismo?",
      a: "En los planes Profesional y Premium sí, tienes un panel muy fácil de usar. En el Básico, me lo pides y lo actualizo rápido.",
    },
    {
      q: "¿Qué pasa si no pago el mantenimiento?",
      a: "Tu web seguirá funcionando, pero sin actualizaciones de seguridad ni soporte. Si algo falla, no podré ayudarte.",
    },
    {
      q: "¿Puedo empezar con un plan y luego cambiarme a otro?",
      a: "Sí, en cualquier momento. Solo pagas la diferencia.",
    },
    {
      q: "¿Cómo me aseguro de que aparezco en Google?",
      a: "Todos los planes incluyen SEO básico. Además, te doy consejos para que tus clientes te encuentren fácil.",
    },
    {
      q: "¿Cuánto tiempo toma tener mi web lista?",
      a: "El Plan Básico en 5-7 días. Los planes más completos en 2-3 semanas, dependiendo de la complejidad.",
    },
    {
      q: "¿Puedo verme antes de pagar?",
      a: "Te envío un diseño previo para que veas cómo quedará. Si no te gusta, lo ajustamos hasta que estés contento.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 border-y border-indigo-900/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-16">
          Respuestas rápidas a tus preguntas
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
      >
        <h3 className="text-lg font-bold text-white pr-4">{question}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-indigo-400 shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 mt-2">
          {answer}
        </div>
      )}
    </div>
  );
}
