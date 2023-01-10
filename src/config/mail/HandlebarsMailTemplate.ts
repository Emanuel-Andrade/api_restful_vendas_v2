import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateContentFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(templateContentFile);

    return parseTemplate(variables);
  }
}

export default new HandlebarsMailTemplate();
