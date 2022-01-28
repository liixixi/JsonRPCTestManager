import * as babelType from "@babel/types"
export class InterfaceDefination
{
  name: string = "";
  declaration: babelType.TSInterfaceDeclaration;
  methods:babelType.TSMethodSignature[] = [];

  constructor(declaration: babelType.TSInterfaceDeclaration)
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