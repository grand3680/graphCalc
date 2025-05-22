declare module 'katex' {
  export function render(
    tex: string,
    ref: Element,
    options?: {
      throwOnError?: boolean;
      displayMode?: boolean;
      macros?: Record<string, string>;
    },
  ): Promise<string>;

  export function renderToString(
    tex: string,
    options?: {
      throwOnError?: boolean;
      displayMode?: boolean;
      macros?: Record<string, string>;
    },
  ): string;
}
