import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Captura erros de render (inclui falha de validação Zod dos dados, que é
 * lançada no carregamento) e mostra um estado de erro claro em vez de tela branca.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[Sandlerflix] erro de render:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
          <h1 className="font-display text-4xl tracking-wide text-primary">
            Sandlerflix
          </h1>
          <p className="font-body text-content-secondary">
            Algo deu errado ao carregar o catálogo.
          </p>
          <pre className="max-w-xl overflow-auto rounded-md bg-bg-elevated p-4 text-left font-mono text-xs text-content-muted">
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-base bg-primary px-5 py-2 font-body font-semibold text-white transition hover:bg-primary-dark"
          >
            Tentar de novo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
