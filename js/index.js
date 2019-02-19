$(document).ready(function() {
    $('#other-title').hide();

    $('#title').on('change', function() {
        if (this.value === 'other') {
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    });

    $('#design').on('change', function() {
        $('#color option').show();
        if(this.value === $("#design option[value='js puns']").val()) {
            $('#color option[value=tomato]').hide();
            $('#color option[value=steelblue]').hide();
            $('#color option[value=dimgrey]').hide();
            $('#color').val('cornflowerblue');
        } else if(this.value === $("#design option[value='heart js']").val()) {
            $('#color option[value=cornflowerblue]').hide();
            $('#color option[value=darkslategrey]').hide();
            $('#color option[value=gold]').hide();
            $('#color').val('tomato');
        }

    });

    $('input[type=checkbox]').on('click', function() {
        var value = this.value;
        var adding = $(this).prop('checked'); 
        if (adding) {
            $("input[type=checkbox][value='"+value+"']").prop('checked', false);
        }
        $(this).prop('checked', adding);
    });

    $('#payment').on('change', function() {
        if(this.value === 'credit card') {
            $('#credit-card').show();
            $('#paypal-payment').hide();
            $('#bitcoin-payment').hide();
        } else if(this.value === 'paypal') {
            $('#credit-card').hide();
            $('#paypal-payment').show();
            $('#bitcoin-payment').hide();
        } else if(this.value === 'bitcoin') {
            $('#credit-card').hide();
            $('#paypal-payment').hide();
            $('#bitcoin-payment').show();
        }
    });

    $('#payment').val('credit card');
    $('#payment').trigger('change');

    $.validator.addMethod("valueNotEquals", function(value, element, arg){
        return arg !== value;
    }, "Value must not equal arg.");

    jQuery.validator.addMethod("zipcode", function(value, element) {
        return this.optional(element) || /^\d{5}(?:-\d{4})?$/.test(value);
    }, "Please provide a valid zipcode.");

    $('#subscribe').validate({
        rules: {
            user_name: {
                required: true
            },
            user_email: {
                required: true,
                email: true
            }, 
            'workshop[]': {
                required: true
            },
            user_payment: {
                valueNotEquals: "select_method"
            },
            'user_cc-num': {
                minlength: 13,
                maxlength: 16,
                number: true,
                required: function () {
                    return $('#payment').val() === 'credit card';
                }
            },
            user_zip: {
                zipcode: true,
                required: function () {
                    return $('#payment').val() === 'credit card';
                }
            },
            user_cvv: {
                rangelength: [3, 3],
                number: true,
                required: function () {
                    return $('#payment').val() === 'credit card';
                }
            }
        },
        messages: {
            'workshop[]': {
                required: "You must check at least 1 workshop"
            },
            user_name: {
                required: "User name is required"
            },
            user_email: {
                required: "User email is required",
                email: "You need to provide a valide email"
            },
            user_payment: {
                valueNotEquals: "Please select a payment method"
            },
            'user_cc-num': {
                number: "Credit Card must be a number",
                minlength : "Credit Card Number must have at least 13 numbers",
                maxlength : "Credit Card Number can't have more than 16 numbers",
                required: "Credit Card Number is required"
            },
            user_zip: {
                zipcode: "Please enter a valid zip code",
                required: "Credit Card Zip is required"
            },
            user_cvv: {
                number: "Credit Card CVV must be a number",
                rangelength: "Credit Card CVV must have 3 numbers",
                required: "Credit Card CVV is required"
            }

        },
        errorPlacement: function(error, element) {
            $('#form_error').append(error);
        },
    });

});