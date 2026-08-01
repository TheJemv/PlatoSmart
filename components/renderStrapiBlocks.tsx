function renderStrapiBlocks(bio: StrapiBlock[] | string | undefined) {
  if (!bio) return null;
  if (typeof bio === "string") return <p>{bio}</p>;

  return bio.map((block, i) => {
    if (block.type === "paragraph") {
      const content = block.children?.map((c) => c.text).join("") || "";
      if (!content.trim()) return null;

      // 1. Detectar elementos de lista (* Item)
      if (content.trim().startsWith("* ")) {
        const listText = content.trim().replace(/^\*\s*/, "");
        // Formatear negritas dentro del item de lista
        const formatted = listText.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={idx} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        return (
          <div key={i} className="flex items-start gap-2 my-1.5 text-muted-foreground">
            <span className="text-primary font-bold">•</span>
            <span>{formatted}</span>
          </div>
        );
      }

      // 2. Parrafos normales con soporte para negritas (**Texto**)
      const formattedParagraph = content.split(/(\*\*.*?\*\*)/g).map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <p key={i} className="mb-3 text-muted-foreground leading-relaxed">
          {formattedParagraph}
        </p>
      );
    }

    return null;
  });
}

export { renderStrapiBlocks }