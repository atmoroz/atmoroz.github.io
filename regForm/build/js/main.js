document.addEventListener('DOMContentLoaded', load);

function load() {
    const form = document.forms[0]; // выбираем form
    const selected = form.elements.age; // выбираем select

    const gender = document.querySelector('.form__sex');
    const inputEmail = form.elements.email;
    const inputPassword = form.elements.password;
    const inputPostalCode = form.elements.postalCode;

    let info = document.querySelector('.form__questions');
    let button = document.querySelector('.footer__button');

    let postalCodeError = document.querySelector('.form__error_postalCode');
    let passwordError = document.querySelector('.form__error_password');
    let emailError = document.querySelector('.form__error_email');
    let errorAge = document.querySelector('.form__error_age');

    // add select options
    addListOptions();

    /**
     * add events input
     */
    gender.addEventListener('click', selectGender);
    form.addEventListener('click', validate);
    info.addEventListener('click', infoHelp);
    button.addEventListener('click', submit);

    /**
     * Валидация полей
     */
    function validate() {

        const TARGET = event.target;

        switch(true) {
            case TARGET.name == 'age' : validAge();
            case TARGET.name == 'email' : validEmail();
            break;
            case TARGET.name == 'password' : validPassword();
            break;
            case TARGET.name == 'postalCode' : validPostalCode();
            break;
        };

        /**
         * Events blur & focus in input[Age]
         */
        function validAge() {
            
            selected.onblur = ()=> testAgeBlur();
        
            testAgeFocus();
        };

        /**
         * Events blur & focus in input[email]
         */
        function validEmail() {

            inputEmail.onblur = () => testEmailBlur();
            
            testEmailFocus();      
        };

        /**
         * Events blur & focus in input[password]
         */
        function validPassword() {

            inputPassword.onblur = () => testPasswordBlur();

            testPasswordFocus();
        };

        /**
         * Events blur & focus in input[postalCode]
         */
        function validPostalCode() {

            inputPostalCode.onblur = () => testPostalCodeBlur();

            testPostalCodeFocus();
        };
    };

    /**
     * Ф-ция проверяет валидность postalCode при потере фокуса
    */
    function testPostalCodeBlur() {
        if ( !inputPostalCode.value ) { // поле password пустое
            postalCodeError.style.display = 'block';
            return false;
        };
        return true;
    };

    /**
     * Ф-ция проверяет валидность postalCode при фокусе
    */
    function testPostalCodeFocus() {
        inputPostalCode.onfocus = () => {
            if( postalCodeError.style.display == 'block' ) {
                postalCodeError.style.display = 'none';
            };
        };      
    };

    /**
     * Ф-ция проверяет валидность password при потере фокуса
    */
    function testPasswordBlur() {
        if ( !inputPassword.value ) { // поле password пустое
            passwordError.style.display = 'block';
            return false;
        };
        return true;
    };

    /**
     * Ф-ция проверяет валидность password при фокусе
    */
    function testPasswordFocus() {
        inputPassword.onfocus = () => {
            if( passwordError.style.display == 'block' ) {
                passwordError.style.display = 'none';
            };
        };
    };

    /**
     * Ф-ция проверяет валидность email при потере фокуса
    */
    function testEmailBlur() {
        let reg = /@/i;
        if( inputEmail.value == '' ) {
            inputEmail.value = "This field can't be empty";
            inputEmail.style.color = '#ff3000';
            return false;
        };

        if ( !reg.test(inputEmail.value) && inputEmail.value ) { // @ не введена
            emailError.style.display = 'block';
            inputEmail.style.color = '#ff3000';
            return false;
        };
    }; 
    /**
     * Ф-ция проверяет валидность email при  фокусе
    */
    function testEmailFocus() {
        inputEmail.onfocus = () => {
            if( inputEmail.value ) {
                inputEmail.value = '';
                inputEmail.style.color = '#333333';
            };

            if( emailError.style.display == 'block' ) {
                emailError.style.display = 'none';
                inputEmail.style.color = '#333333';
                inputEmail.value = '';
            };
        };
    };

    /**
     * Ф-ция проверяет возраст посетителя при потере фокуса
    */
    function testAgeBlur() {
        
        let nowDate = getYear();
        let currentAge =  selected.value;

        if( (nowDate - currentAge) < 18 ) {
            errorAge.style.display = 'block';
            return false;
        };
    };

    /**
     * Ф-ция проверяет возраст посетителя при фокусе
    */
    function testAgeFocus() {
        selected.onfocus = () =>  errorAge.style.display = 'none';
    };

    /**
     * Ф-ция submit, в случае валидности формы отправка ее на сервер
     */
    function submit() {
        event.preventDefault();

        let nowDate = getYear();
        let currentAge =  selected.value;

        if( (nowDate - currentAge) < 18 ) {
            testAgeBlur();
            testAgeFocus();
            return false;
        } else if( inputEmail.value == '' ) {
            testEmailBlur();
            testEmailFocus();
            return false;
        } else if( !testPasswordBlur() ) {
            testPasswordBlur();
            testPasswordFocus();
            return false;
        }else if( !testPostalCodeBlur() ) {
            testPostalCodeBlur();
            testPostalCodeFocus();
            return false;
        };  
        console.log('Form is valid!');        
    };

    /**
     * Ф-ция возвращает текущую дату
    */
    function getYear() {
        let nowDate = new Date();
        return nowDate.getFullYear();
    };

    /**
     * Ф-ция генерирует года начиная от текущего года и до 1947
     * и вставляет в option тега select
    */
    function addListOptions() {
        let nowYear = getYear();
        //Добавить новые опции 
        for(let i = 1947; i <= nowYear; i++) {
            newOption =  new Option(i, i,true,true);
            //selected .appendChild(newOption);
            selected.insertBefore(newOption,selected.children[0]);
        }
        
        //Отменить выбор последней добавленной опции
        newOption.selected = false;
    };

    /**
     * Ф-ци устанавливает checked на выбранный пользователем пол
    */
    function selectGender() {
        const TARGET = event.target;
        let checked = document.querySelector('.form__sex_icon_checked');
        checked !== null ? checked.classList.remove('form__sex_icon_checked') : false;
        TARGET.closest('.form__sex_icon').classList.add('form__sex_icon_checked');
    };

    /**
     * Ф-ция показывает и скрывает окошко синфой
     */
    function infoHelp() {
        const infoQuestions = document.querySelector('.form__info_questions');

        infoQuestions.style.display == 'block' ? infoQuestions.style.display = 'none' : infoQuestions.style.display = 'block';
    };
};