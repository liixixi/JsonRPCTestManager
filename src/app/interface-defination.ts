import * as babelParser from "@babel/types"
export class InterfaceDefination
{
  name: string = "";
  declaration: babelParser.TSInterfaceDeclaration;
  methods:babelParser.TSMethodSignature[] = [];

  constructor(declaration: babelParser.TSInterfaceDeclaration)
  {
      this.declaration = declaration;
      this.name = this.declaration.id.name;

      this.declaration.body.body.forEach( f => {
          if (f.type == 'TSMethodSignature')
          {
              this.methods.push(f);
          }
      })
  }

}