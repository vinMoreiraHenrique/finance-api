import fs from "fs";
import path from "path";

// Definir o caminho do arquivo do schema
const schemaFilePath = path.resolve(__dirname, "../../prisma/schema.prisma");

// Campos comuns a serem adicionados
const baseFields = `
  uuid        String          @id @default(uuid())
  created_at DateTime @default(now())
  updated_at DateTime @default(now()) @updatedAt
`;

// Ler o conteúdo atual do schema
let schemaContent = fs.readFileSync(schemaFilePath, "utf8");

// Função para verificar se os campos 'createdAt' e 'updatedAt' estão presentes em um modelo
const hasBaseFields = (modelBody: string): boolean => {
  // Normaliza o corpo do modelo
  const lines = modelBody
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const baseFieldsLines = baseFields
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const baseFieldNames = baseFieldsLines.map((field) => field.split(" ")[0]);
  const modelFieldNames = lines.map((line) => line.split(" ")[0]);

  // Verifica se todos os campos base estão presentes
  return baseFieldNames.every((fieldName) =>
    modelFieldNames.includes(fieldName)
  );
};

// Função para atualizar modelos existentes no schema
const updateModels = (): string => {
  const modelRegex = /model\s+(\w+)\s+\{([^}]*)\}/g;
  let match;
  let updatedSchemaContent = schemaContent;

  // Itera sobre todos os modelos encontrados
  while ((match = modelRegex.exec(schemaContent)) !== null) {
    const modelName = match[1];
    const modelBody = match[2].trim();

    if (!hasBaseFields(modelBody)) {
      // Adiciona os campos base ao modelo, mantendo a ordem dos campos existentes
      const updatedModelBody = `${modelBody.trim()}
  ${baseFields.trim()}
`;

      // Substitui o corpo do modelo no conteúdo do schema com formatação adequada
      const modelToReplace = `model ${modelName} {${modelBody}}`;
      const updatedModelToReplace = `model ${modelName} {\n${updatedModelBody
        .trim()
        .replace(/^\s+|\s+$/g, "")}\n}`;

      // Substitui o corpo do modelo no conteúdo do schema
      updatedSchemaContent = updatedSchemaContent.replace(
        new RegExp(`model ${modelName} {[^}]*}`, "g"),
        updatedModelToReplace
      );
    }
  }

  return updatedSchemaContent;
};

// Atualiza o schema
const updatedSchemaContent = updateModels();

// Escrever o conteúdo atualizado de volta ao arquivo
fs.writeFileSync(schemaFilePath, updatedSchemaContent.trim());
console.log(
  "schema.prisma atualizado com os campos comuns em todas as tabelas."
);
