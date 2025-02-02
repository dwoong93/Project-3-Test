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


//create product form function
const createproductForm = (categories, types, subtypes, keyboardkits) => {
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
    'type_id': fields.string({
        label: 'Product Type',
        required: true,
        errorAfterField: true,
        widget: widgets.select(),
        choices: types
    }),
    'subtype_id': fields.string({
        label: 'Product Subtype',
        required: true,
        errorAfterField: true,
        widget: widgets.select(),
        choices: subtypes
    }),
    'material': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: false, //if doesnt work, change to true
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories

        }),
    // 'keyboardKit': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    'keyboardkits': fields.string({
        label: 'Compatible Keyboard Kit(s) (Ctrl + Click to select or deselect multiple kits)',
        required: false, //if doesnt work, change to true
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        widget: widgets.multipleSelect(),
        choices: keyboardkits
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
        'label':'Cost (Please type in cents)',
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
    }),
    'description': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
        
})
};

//create keyboard kit form function
const createkeyboardKitForm = () => {
    return forms.create({

    'name': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    })
        
})
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
            cssClasses: {
                label: ['form-label']
            },
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
        'image_url':fields.string({
            required: true,
            widget: widgets.hidden()
        })
            
    })
};

//create keyboard pcb form function
const createkeyboardPcbForm = (categories, keyboardcase) => {
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
        widget: widgets.select(),
        choices: {'Hotswap':'Hotswap', 'Solder':'Solder'},
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
    'keyboardcase': fields.string({
        label: 'Compatible Cases',
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        widget: widgets.multipleSelect(),
        choices: keyboardcase
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
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
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
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
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
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
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
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
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
    'image_url':fields.string({
        required: true,
        widget: widgets.hidden()
    })
})
};

//Users aka Staff
const createRegistrationForm = () => {
    return forms.create({
    'username': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'confirm_password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        },
        validators: [validators.matchField('password')]
        }),
        'image_url':fields.string({
            widget: widgets.hidden()
        })
    })
}

const createLoginForm = () => {
    return forms.create({
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    })
}

const UpdateAccountForm = () => {
    return forms.create({
    'username': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    })
}
//Customers
const createCustomerRegistrationForm = () => {
    return forms.create({
    'username': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'address': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'contact': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'confirm_password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        },
        validators: [validators.matchField('password')]
        }),
        'image_url':fields.string({
            widget: widgets.hidden()
        })
    })
}

const createCustomerLoginForm = () => {
    return forms.create({
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    })
}
const UpdateCustomerAccountForm = () => {
    return forms.create({
    'username': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'email': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'address': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    'contact': fields.string({
        required: true,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    'password': fields.password({
        required: true,
        errorAfterField: true,
        cssClasses: {
        label: ['form-label']
        }
    }),
    })
}

//Search Engine

//create product filter form function
const createproductSearchForm = (categories, types, subtypes, keyboardkits) => {
    return forms.create({
    'name': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'type_id': fields.string({
        label: 'Product Type',
        required: false,
        errorAfterField: true,
        widget: widgets.select(),
        choices: types
    }),
    'subtype_id': fields.string({
        label: 'Product Subtype',
        required: false,
        errorAfterField: true,
        widget: widgets.select(),
        choices: subtypes
    }),
    'material': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: false, 
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories

        }),
    'keyboardkits': fields.string({
        label: 'Compatible with Keyboard Kit:',
        required: false, 
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        widget: widgets.multipleSelect(),
        choices: keyboardkits
    }),
    'quantity': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
        
    }),
    // 'cost': fields.string({
    //     required: true,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     },
    //     'validators':[validators.integer()]
    // }),
    'max_cost': fields.string({
        label: 'Maximum Cost',
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
    }),
    
    // 'description': fields.string({
    //     required: true,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    // 'image_url':fields.string({
    //     required: true,
    //     widget: widgets.hidden()
    // })
        
})
};


//create keyboard case filter form function
const createkeyboardCaseSearchForm = (categories, keyboardpcb) => {
    return forms.create({
    'name': fields.string({required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'material': fields.string({
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: false,
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories

        }),
    // 'keyboardKit': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    // 'keyboardpcb': fields.string({
    //     label: 'Compatible PCB',
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     },
    //     widget: widgets.multipleSelect(),
    //     choices: keyboardpcb
    // }),
    // 'quantity': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     },
    //     'validators':[validators.integer()]
        
    // }),
    'max_cost': fields.string({
        label: 'Maximum Cost',
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        'validators':[validators.integer()]
    }),
    // 'description': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    // 'image_url':fields.string({
    //     widget: widgets.hidden()
    // })
        
})
};

//create keyboard pcb filter form function
const createkeyboardPcbSearchForm = (categories, keyboardcase) => {
    return forms.create({
    'name': fields.string({required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'brand': fields.string({required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        }
    }),
    'switchConnectionType': fields.string({
        required: false,
        errorAfterField: true,
        widget: widgets.select(),
        choices: {'Hotswap':'Hotswap', 'Solder':'Solder'},
        cssClasses: {
            label: ['form-label']
        }
        
    }),
    'category_id': fields.string({
        label: 'Form Factor',
        required: false,
        errorAfterField: true,
        widget: widgets.select(),
        choices:categories
        }),
    // 'quantity': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     },
    //     'validators':[validators.integer()]
        
    // }),
    // 'keyboardKit': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    // 'keyboardcase': fields.string({
    //     label: 'Compatible Cases',
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     },
    //     widget: widgets.multipleSelect(),
    //     choices: keyboardcase
    // }),
    'max_cost': fields.string({
        label: 'Maximum Cost',
        required: false,
        errorAfterField: true,
        cssClasses: {
            label: ['form-label']
        },
        // 'validators':[validators.integer()]
    }),
    // 'description': fields.string({
    //     required: false,
    //     errorAfterField: true,
    //     cssClasses: {
    //         label: ['form-label']
    //     }
    // }),
    // 'image_url':fields.string({
    //     required: false,
    //     widget: widgets.hidden()
    // })
})
};


  
module.exports = {
    createproductForm,
    createkeyboardKitForm,
    createkeyboardCaseForm, 
    createkeyboardPcbForm, 
    createkeyboardPlateForm, 
    createkeyboardSwitchForm,
    createkeyboardKeycapForm,
    createkeyboardStabilizerForm,
    createRegistrationForm,
    createLoginForm,
    UpdateAccountForm,
    createCustomerRegistrationForm, 
    createCustomerLoginForm,
    UpdateCustomerAccountForm,
    createkeyboardCaseSearchForm,
    createkeyboardPcbSearchForm,
    createproductSearchForm,
    bootstrapField };
        