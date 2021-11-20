// import in caolan forms
const forms = require("forms");
// create some shortcuts
const widgets = forms.widgets;
const fields = forms.fields;
const validators = forms.validators;
var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) {
        object.widget.classes = [];
    }
    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }
    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }
    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' :
        '';
    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group">' + label + widget + error + '</div>';
};

//create keyboard case form function
const createkeyboardCaseForm = (categories, keyboardpcb) => {
        return forms.create({
        'name': fields.string({required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'brand': fields.string({required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'material': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'category_id': fields.string({
            label: 'Form Factor',
            required: true,
            errorAfterField: true,
            widget: widgets.select(),
            choices:categories

            }),
        'keyboardKit': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'keyboardpcb': fields.string({
            label: 'Compatible PCB',
            required: true,
            errorAfterField: true,
            widget: widgets.multipleSelect(),
            choices: keyboardpcb
        }),
        'quantity': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            'validators':[validators.integer()]
            
        }),
        'cost': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            // 'validators':[validators.integer()]
        }),
        'description': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
    })
};

//create keyboard pcb form function
const createkeyboardPcbForm = (categories) => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchConnectionType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: true,
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories
        }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'keyboardKit': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
//create keyboard plate form function
const createkeyboardPlateForm = (categories) => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'plateMaterial': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: true,
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'keyboardKit': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};

//create keyboard switch form function
const createkeyboardSwitchForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchConnectionType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]   
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
//create keyboard keycap form function
const createkeyboardKeycapForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'size': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
    }),
    'keycapMaterial': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
    }),
    'keycapProfile': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]   
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
//create keyboard stabilizer form function
const createkeyboardStabilizerForm = () => {
    return forms.create({
    'name': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'stabilizerType': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
    }),
    'quantity': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]   
    }),
    'cost': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
})
};
module.exports = { 
    createkeyboardCaseForm, 
    createkeyboardPcbForm, 
    createkeyboardPlateForm, 
    createkeyboardSwitchForm,
    createkeyboardKeycapForm,
    createkeyboardStabilizerForm, 
    bootstrapField };
        