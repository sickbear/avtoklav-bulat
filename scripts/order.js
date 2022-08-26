document.addEventListener('alpine:init', () => {
  Alpine.store('order', {
    allModels: {
      // без ТЭНа
      '1_1': {
        price: 11950,
        oldPrice: 18500,
        id: 482133,
      },
      '2_1': {
        price: 14950,
        oldPrice: 21150,
        id: 482134
      },
      '3_1': {
        price: 15950,
        oldPrice: 25500,
        id: 482135
      },
      '4_1': {
        price: 18950,
        oldPrice: 28350,
        id: 482136
      },
      // с ТЭНом
      '1_2': {
        price: 16450,
        oldPrice: 25150,
        id: 482137
      },
      '2_2': {
        price: 19450,
        oldPrice: 27800,
        id: 482138
      },
      '3_2': {
        price: 20450,
        oldPrice: 32650,
        id: 482139
      },
      '4_2': {
        price: 23450,
        oldPrice: 35500,
        id: 482140
      },
      // с ТЭНом и блоком управления
      '1_3': {
        price: 20850,
        oldPrice: 27800,
        id: 482150
      },
      '2_3': {
        price: 23850,
        oldPrice: 31800,
        id: 482151
      },
      '3_3': {
        price: 24850,
        oldPrice: 35500,
        id: 482152
      },
      '4_3': {
        price: 26850,
        oldPrice: 38350,
        id: 482153
      },
    },
    product: {
      show: false,
      selected: '13 л',
      id: 482133,
      prefix: 1,
      items: {
        1: {
          name: '13 л'
        },
        2: {
          name: '18 л'
        },
        3: {
          name: '25 л'
        },
        4: {
          name: '32 л'
        },
      },
      params: {
        1: {
          diameter: '272 мм',
          height: '330 мм',
          weight: '5,5 кг',
          capacity: {
            half_liter: '7 банок по 0,5 л',
            liter: '4 банки по 1 л'
          }
        },
        2: {
          diameter: '272 мм',
          height: '410 мм',
          weight: '6,6 кг',
          capacity: {
            half_liter: '14 банок по 0,5 л',
            liter: '4 банки по 1 л'
          }
        },
        3: {
          diameter: '272 мм',
          height: '520 мм',
          weight: '7,7 кг',
          capacity: {
            half_liter: '21 банка по 0,5 л',
            liter: '8 банок по 1 л'
          }
        },
        4: {
          diameter: '272 мм',
          height: '660 мм',
          weight: '9 кг',
          capacity: {
            half_liter: '28 банок по 0,5 л',
            liter: '12 банок по 1 л'
          }
        }
      }
    },
    ten: {
      show: false,
      selected: 'без ТЭНа',
      prefix: 1,
      items: {
        1: {
          name: 'без ТЭНа'
        },
        2: {
          name: 'с ТЭНом'
        },
        3: {
          name: 'с ТЭНом и блоком управления'
        },
      },
    },
    dop: {
      price: 0,
      oldPrice: 0,
      items: {
        '482131': {
          selected: false,
          name: 'Насадка-дистиллятор',
          price: 7990,
          oldprice: 9000,
          qnt: 0,
        },
        '4530': {
          selected: false,
          name: 'Набор для копчения',
          price: 2590,
          oldprice: 3500,
          qnt: 0,
        },
        '482373': {
          selected: false,
          name: 'Жестяные банки',
          price: 490,
          oldprice: 690,
          qnt: 0,
        },
        '482116': {
          selected: false,
          name: 'Набор индивидуальных<br> защитных зажимов',
          price: 1490,
          oldprice: 2500,
          qnt: 0,
        },
      },
    },
    kredit: false,
    check: [],
    modelPrices: {
      new: 11950,
      old: 18500            },
    dopPrice: 0,
    totalPrice: 11950,
    current_params: {
      diameter: null,
      height: null,
      weight: null,
      capacity: {
        half_liter: null,
        liter: null,
      }
    },
    getModelPrefix(model_id) {
      this.product.prefix = model_id;
      this.getModelPrice();
      this.getModelParams();
    },
    getTenPrefix(ten_id) {
      this.ten.prefix = ten_id;
      this.getModelPrice();
    },
    getModel() {
      return `${this.product.prefix}_${this.ten.prefix}`;
    },
    getQnt(id) {
      this.dop.items[id].qnt = this.countInCheck(id);
    },
    getModelParams() {
      const model = this.product.prefix;
      this.current_params.diameter = this.product.params[model].diameter;
      this.current_params.height = this.product.params[model].height;
      this.current_params.weight = this.product.params[model].weight;
      this.current_params.capacity.half_liter = this.product.params[model].capacity.half_liter;
      this.current_params.capacity.liter = this.product.params[model].capacity.liter;
    },
    countInCheck(id) {
      return this.check.includes(id) ? 1 : 0;
    },
    getDopPrice() {
      if (this.check.length) {
        this.dopPrice = this.check.reduce((sum, id) => {
          return sum + this.dop.items[id]['price'];
        }, 0);
      } else {
        this.dopPrice = 0;
      }
      this.getTotalPrices();
    },
    getModelPrice() {
      const model = this.getModel();
      this.modelPrices.new =  this.allModels[model].price;
      this.modelPrices.old =  this.allModels[model].oldPrice;
      this.getTotalPrices();
      this.setID(this.allModels[model].id);
    },
    getTotalPrices() {
      this.totalPrice =  this.modelPrices.new + this.dopPrice;
    },
    setID(id) {
      this.product.id = id;
    },
    checkKredit() {
      if (!this.kredit) this.kredit = true;
    },
    async checkDop(dop_id) {
      this.check = [];
      this.dopPrice = 0;

      const clearDop = () => {
        for (let e in this.dop.items) {
          this.dop.items[e].selected = false;
        }
      }
      
      await clearDop.call(this);
      document.getElementById(`checkbox-${dop_id}`).click();
    }
  });
});