import { environment } from './environnement.js';

class benebono {
    static element = "";
    static ab = "";

    async ajaxLoading() {
        document.getElementById('basket-btn').addEventListener('click', async () => {
            try {
                const response = await fetch(environment.endpoint + '/version2');
                this.element = document.getElementById('content');
                if (!response.ok) {
                    throw new Error('error from API Ab test json');
                }
                const data = await response.json();
                this.ab = data.checkout[0].account.title;
                document.getElementById('stage').innerHTML = this.ab;
                this.ajaxAccount();
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        });
    }
    async ajaxFinal() {
        try {
            document.getElementById('final').addEventListener('click', async (event) => {
                console.log("here")
                const response = await fetch(environment.endpoint + '/final');
                const data = await response.text();
                this.element.innerHTML = data;
            })
            
        }
        catch (error) {
            console.error('There was a problem:', error);
        }
    }
    async ajaxBasket() {
        try {
            console.log('here');
            const response = await fetch(environment.endpoint + '/basket');
            const data = await response.json();
            this.element.innerHTML = data.content;
            var basket_div = document.getElementsByClassName('basket_div');
            for (var i = 0; i < basket_div.length; i++) {
                basket_div[i].addEventListener('click', this.handleDivClick);
            }

            let form = document.getElementById('basket_form');
            if (form) {
                form.addEventListener('submit', event =>  this.handleFormSubmit(event, environment.endpoint + '/basket'));
            }

            this.ajaxFinal()
        } catch (error) {
            console.error('There was a problem:', error);
        }
    }

    async ajaxAccount() {
            try {
                const response = await fetch(environment.endpoint + '/account');
                const data = await response.text();
                this.element.innerHTML = data
                let account_form = document.getElementById('account_form');
                if(account_form){
                    account_form.addEventListener('submit', event => this.handleFormSubmit(event, environment.endpoint + '/account'))    
                }

                
            } catch (error) {
                console.error('There was a problem:', error);
            }

            let btn = document.getElementById('account-btn')
            btn.addEventListener("click", () => {
                this.ajaxBasket();
            })

    }
    async handleDivClick(event) {
        var value = event.target.id;
        document.getElementById('basket_input').value = value;
        event.target.style.backgroundColor = 'orange';
        event.preventDefault();
    }
    
    async  handleFormSubmit(event, url) {
        event.preventDefault();
        if(event.target instanceof HTMLFormElement) {
            var formData = new FormData(event.target);
        }
         
        let object = {};
        formData.forEach((value, key) => object[key] = value);
        console.log(object);
        var json = JSON.stringify(object);
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: json
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}
let bn = new benebono();
bn.ajaxLoading()






