import readline from 'readline-sync';

export let postCode = "";

export function getPostCodeFromUser() {
    try{
        postCode = readline.question("Postcode: ").toUpperCase().trim();
        const regex = /\b^(E|EC|N|NW|S|SW|SE|W|WC|HA|RM|IL)[0-9]{1,2}\s?[0-9][A-Z]{2}\b/; // Include greater London
        if (regex.test(postCode)) {
            return postCode;
        }
        else {
            throw new Error ("Invalid postcode.");
        }
    }
    catch(Error){
          console.error(`Error: ${Error}`);
          getPostCodeFromUser();
    }
}

