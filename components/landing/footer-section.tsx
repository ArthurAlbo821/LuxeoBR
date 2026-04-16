"use client";

import { Github, Twitter } from "lucide-react";

const footerLinks = {
  Studio: [
    { name: "Capabilities", href: "#studio" },
    { name: "Método", href: "#metodo" },
    { name: "Stack", href: "#stack" },
    { name: "Por que nós", href: "#porque" },
  ],
  Empresa: [
    { name: "Sobre", href: "#" },
    { name: "Genebra", href: "#" },
    { name: "São Paulo", href: "#" },
    { name: "Contato", href: "#contato" },
  ],
  Legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              {/* Logo */}
              <a href="#" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="font-mono text-primary font-bold text-sm">L</span>
                </div>
                <span className="font-semibold text-lg tracking-tight">Luxeo Labs</span>
              </a>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Venture studio. Engenharia de produto. Genebra + São Paulo.
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 Luxeo Labs. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
