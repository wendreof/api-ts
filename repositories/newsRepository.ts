import * as mongoose from 'mongoose';
import NewsSchema from '../models/newsSchema';

export default mongoose.model('news', NewsSchema);