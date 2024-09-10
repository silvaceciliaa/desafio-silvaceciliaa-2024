class RecintosZoo {
    constructor() {
      this.recintos = [
        { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
        { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
        { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
        { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
        { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
      ];
  
      this.animais = {
        "LEAO": { tamanho: 3, biomas: ["savana"], carnivoro: true },
        "LEOPARDO": { tamanho: 2, biomas: ["savana"], carnivoro: true },
        "CROCODILO": { tamanho: 3, biomas: ["rio"], carnivoro: true },
        "MACACO": { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
        "GAZELA": { tamanho: 2, biomas: ["savana"], carnivoro: false },
        "HIPOPOTAMO": { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false }
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      if (!this.animais[tipoAnimal]) {
        return { erro: "Animal inválido" };
      }
    
      if (quantidade <= 0 || isNaN(quantidade)) {
        return { erro: "Quantidade inválida" };
      }
    
      const { tamanho, biomas, carnivoro } = this.animais[tipoAnimal];
    
      let recintosViaveis = [];
    
      this.recintos.forEach(recinto => {
        if (!biomas.some(bioma => recinto.bioma.includes(bioma))) return;

        let numEspacoOcupado = recinto.animais.reduce(
            (acc, animal) => acc + animal.quantidade * this.animais[animal.especie].tamanho,
            0
        );

        let numEspacoNecessario = tamanho * quantidade;

        let numEspacoDisponivel = recinto.tamanho - numEspacoOcupado;

        if (recinto.animais.some(a => a.especie !== tipoAnimal)) {
            numEspacoDisponivel -= 1; 
        }

        if (numEspacoNecessario > numEspacoDisponivel) return;

        if (carnivoro && recinto.animais.some(a => a.especie !== tipoAnimal)) return;

        if(!carnivoro && recinto.animais.some(a => this.animais[a.especie].carnivoro)) return;
      
        if (tipoAnimal === "MACACO" && recinto.animais.length === 0 && quantidade < 2) return;

        if (tipoAnimal === "HIPOPOTAMO" && recinto.bioma !== "savana e rio" && recinto.animais.some(a => a.especie !== tipoAnimal)) return;
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${numEspacoDisponivel - numEspacoNecessario} total: ${recinto.tamanho})`);
      });
    
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
    
      return { recintosViaveis: recintosViaveis.sort() };
    }
  }

  export { RecintosZoo as RecintosZoo};
