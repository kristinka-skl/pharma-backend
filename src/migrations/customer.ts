import { Customer } from "../models/customer.js";

export const migrateSpentToNumber = async () => {
  try {
    const allCustomers = await Customer.find().lean();
    let updatedCount = 0;

    for (const customer of allCustomers) {
      if (typeof customer.spent === 'string') {

        const cleanNumber = Number((customer.spent as string).replace(/,/g, ''));

        await Customer.collection.updateOne(
          { _id: customer._id },
          { $set: { spent: cleanNumber } }
        );
        updatedCount++;
      }
    }

    console.log(`Updated documents: ${updatedCount}`);
  } catch (error) {
    console.error( error);
  }
};

// migrateSpentToNumber();
