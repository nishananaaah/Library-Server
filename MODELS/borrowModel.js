import mongoose from "mongoose"

const borrowSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  productId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  borrowDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  status: { type: String, enum: ['Borrowed', 'Renewed', 'Returned'], default: 'Borrowed' },
  fine: { type: Number, default: 0 }
});



const Borrow = mongoose.model("Borrow",borrowSchema);
export default Borrow;