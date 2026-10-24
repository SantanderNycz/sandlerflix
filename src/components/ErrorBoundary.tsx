import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

/**
 * Captura erros de render (inclui falha de validação Zod dos dados, lançada
 * no carregamento) e mostra um estado de erro claro em vez de tela branca.
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
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <h1 style={{ color: "#e50914", fontSize: "2rem" }}>Sandlerflix</h1>
          <p style={{ color: "#b3b3b3" }}>Algo deu errado ao carregar o catálogo.</p>
          <pre
            style={{
              maxWidth: 640,
              overflow: "auto",
              background: "#1a1a1a",
              padding: 16,
              borderRadius: 8,
              textAlign: "left",
              fontSize: 12,
              color: "#888",
            }}
          >
            {this.state.error.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-play"
            style={{ padding: "10px 20px" }}
          >
            Tentar de novo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
