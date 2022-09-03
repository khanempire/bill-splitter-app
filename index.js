let no_of_bills = +prompt("Enter the no bills?");

let bill_details = [];
let per_person_amount_for_each_bill = [];

for (let i = 0; i < no_of_bills; i++) {
   let no_of_person = +prompt(
      `Enter the no of the person that is participating in the ${i + 1} bill ?`
   );
   let person_per_amount_paid = {};
   let total_amount_paid = 0;
   for (let j = 0; j < no_of_person; j++) {
      let name_of_person = prompt(`Enter the name of the person?`);
      let amount_paid = +prompt(`Enter the paid amount?`);
      total_amount_paid = total_amount_paid + amount_paid;
      person_per_amount_paid[name_of_person] = amount_paid;
   }
   bill_details.push(person_per_amount_paid);
   per_person_amount_for_each_bill.push(total_amount_paid / no_of_person);
}

function calculateBills() {
   let amount_distribution = [];
   for (let itr = 0; itr < bill_details.length; i++) {
      let single_bill_details = bill_details[itr];
      let single_bill_per_person_amount = per_person_amount_for_each_bill[itr];
      let person_to_take_amount = {};
      let person_to_give_amount = {};
      for (let key in single_bill_details) {
         if (single_bill_per_person_amount < single_bill_details[key]) {
            person_to_take_amount[key] =
               single_bill_details[key] - single_bill_per_person_amount;
         }
      }
      for (let key in single_bill_details) {
         if (single_bill_per_person_amount > single_bill_details[key]) {
            person_to_give_amount[key] =
               single_bill_per_person_amount - single_bill_details[key];
         }
      }
      const person_to_take_amount_new = (obj) =>
         Object.values(person_to_take_amount)
            .reverse()
            .reduce((res, key) => ((res[key] = obj[key]), res), {});
      const person_to_give_amount_new = (obj) =>
         Object.values(person_to_give_amount)
            .reverse()
            .reduce((res, key) => ((res[key] = obj[key]), res), {});

      for (let give in person_to_give_amount_new) {
         if (person_to_give_amount_new[give] > 0) {
            for (let take in person_to_take_amount_new) {
               if (person_to_take_amount_new[take] > 0) {
                  let settlement = {};
                  if (
                     person_to_give_amount_new[give] >=
                     person_to_take_amount_new[take]
                  ) {
                     settlement["Person_from"] = give;
                     settlement["Person_to"] = take;
                     settlement["Amount"] = person_to_take_amount_new[take];
                     amount_distribution.push(settlement);
                     person_to_give_amount_new[give] =
                        person_to_give_amount_new[give] -
                        person_to_take_amount_new[take];
                     person_to_take_amount_new[take] = 0;
                  } else {
                     settlement["Person_from"] = give;
                     settlement["Person_to"] = take;
                     settlement["Amount"] = person_to_take_amount_new[give];
                     amount_distribution.push(settlement);
                     person_to_give_amount_new[give] = 0;
                     person_to_take_amount_new[take] =
                        person_to_take_amount_new[take] -
                        person_to_give_amount_new[give];
                  }
               }
            }
         }
      }
   }
}

let amount_distribution = calculateBills();

function finalAmountDistributionBills(amount_distribution) {
   amount_distribution.map((amount_d, index) => {
      let final_amount_distribution = [];
      amount_distribution.forEach((amount, idx) => {
         if (
            index !== idx &&
            amount_d["Person_from"] === amount["Person_from"] &&
            amount_d["Person_to"] === amount["Person_to"]
         ) {
            let result = {};
            result["Person_from"] = amount_d["Person_from"];
            result["Person_to"] = amount_d["Person_to"];
            result["Amount"] = amount_d["Amount"] + amount["Amount"];
            final_amount_distribution.push(result);
         }
      });
      return final_amount_distribution;
   });
}

const final_amount_distribution = finalAmountDistributionBills();

const bill_splitter = document.getElementById("bill-splitter");

bill_splitter.innerText(JSON.stringify(final_amount_distribution));
