const MENU = {
	짜장: { price: 7000 },
	짬뽕: { price: 9900 },
	탕슉: { price: 25000, taxfree: 1 },
};

const LABEL_SIZE = 6;
const PRICE_SIZE = 7;

function bill(tableNo) {
	const ordered = [];
	let totalPrice = 0;
	let totalTax = 0;

	function calcTax(price) {
		return Math.round((price / 1.1) * 0.1);
	}

	function priceFmt(price, unit = "원") {
		return price.toLocaleString().padStart(PRICE_SIZE, " ") + unit;
	}

	function printLine(flag = "=") {
		console.log(flag.repeat(LABEL_SIZE * 2 + PRICE_SIZE + 2));
	}

	function f(strings, ...values) {
		const [label, unit] = strings;
		const price = values[0];
		console.log(
			`${label.padEnd(LABEL_SIZE, " ")} ${priceFmt(price, unit)}`
		);
	}

	return {
		order(item) {
			ordered.push(item);
			const { price, taxfree } = MENU[item];
			totalPrice += price;
			totalTax += taxfree ? 0 : calcTax(price);
		},

		printBill() {
			console.log(`\n\nTable. ${tableNo}`);
			printLine();
			for (const item of ordered) {
				const { price, taxfree } = MENU[item];
				console.log("*", item);
				f`공급가액: ${price}원`;
				f`부가세액: ${taxfree ? 0 : calcTax(price)}원`;
				printLine("-");
			}
			f`주문합계: ${totalPrice}원`;
			f`부가세액: ${totalTax}원`;
			printLine();
		},
	};
}

const table1 = bill(1);
table1.order("짜장");
table1.order("짬뽕");
table1.printBill();

const table2 = bill(2);
table2.order("짜장");
table2.printBill();

table1.order("탕슉");
table1.printBill();

table2.order("짬뽕");
table2.printBill();
