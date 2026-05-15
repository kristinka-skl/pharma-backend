import { IncomeExpense } from "../models/incomeExpense.js";

export const migrateIncomeExpensesToNumber = async () => {
  try {
    const allExpenses = await IncomeExpense.find().lean();
    let updatedCount = 0;

    for (const item of allExpenses) {
      if (typeof item.amount === 'string') {

        const cleanString = (item.amount as string).replace(/,/g, '');
        const cleanNumber = Number(cleanString);

        await IncomeExpense.collection.updateOne(
          { _id: item._id },
          { $set: { amount: cleanNumber } }
        );
        updatedCount++;
      }
    }

    console.log(`Updated documents: ${updatedCount}`);
  } catch (error) {
    console.error(error);
  }
};

// migrateIncomeExpensesToNumber();
