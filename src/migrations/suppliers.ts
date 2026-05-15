import { Supplier } from "../models/supplier.js";

export const migrateSupplierAmounts = async () => {

  let updatedCount = 0;
  let skippedCount = 0;

  try {
    const suppliers = await Supplier.collection.find({}).toArray();


    for (const supplier of suppliers) {
      const rawAmount = supplier.amount;


      if (typeof rawAmount === 'number' && !isNaN(rawAmount)) {
        skippedCount++;
        continue;
      }


      const stringValue = String(rawAmount || '');
      const cleanedString = stringValue.replace(/[^\d.-]/g, '');
      let parsedNumber = parseFloat(cleanedString);


      if (isNaN(parsedNumber)) {
        parsedNumber = 0;
      }

      await Supplier.collection.updateOne(
        { _id: supplier._id },
        { $set: { amount: parsedNumber } }
      );

      updatedCount++;
    }
    console.log(`Updated documents: ${updatedCount}`);
    console.log(`Skipped: ${skippedCount}`);

  } catch (error) {
    console.error(error);
  }
};

// migrateSupplierAmounts();
