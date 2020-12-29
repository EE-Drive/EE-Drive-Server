
// -----------------------------------------------------------------------------------------------
// ------------------------------------------- STRINGS -------------------------------------------
// -----------------------------------------------------------------------------------------------

const [SMALL_STRING, MEDIUM_STRING, LONG_STRING] = [40, 80, 120];

/**
 * Required trimmed string with no restrictions.
 */
module.exports.requiredString = {
    type:String,
    required: true,
    trim: true,
};

/**
 * Trimmed string with no restrictions.
 */
module.exports.nonRequiredString = {
    type:String,
    trim: true,
};

/**
 * Required trimmed string with maximum of 40 characters.
 */
module.exports.requiredSmallString = {...module.exports.requiredString, maxlength:SMALL_STRING};

/**
 * Trimmed string with maximum of 40 characters.
 */
module.exports.nonRequiredSmallString = {...module.exports.nonRequiredString, maxlength: SMALL_STRING};

/**
 * Required trimmed string with maximum of 80 characters.
 */
module.exports.requiredMediumString = {...module.exports.requiredString, maxlength: MEDIUM_STRING};

/**
 * Trimmed string with maximum of 80 characters.
 */
module.exports.nonRequiredMediumString = {...module.exports.nonRequiredString, maxlength: MEDIUM_STRING};

/**
 * Required trimmed string with maximum of 120 characters.
 */
module.exports.requiredLongString = {...module.exports.requiredString, maxlength: LONG_STRING };

/**
 * Trimmed string with maximum of 120 characters.
 */
module.exports.nonRequiredLongString = {...module.exports.nonRequiredString, maxlength: LONG_STRING};


// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Numbers -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Number with no restrictions.
 */
module.exports.requiredNumber = {type:Number, required: true};

/**
 * Number with no restrictions.
 */
module.exports.nonRequiredNumber = {type:Number };

// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Boolean -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * Required Boolean with no restrictions.
 */
module.exports.requiredBoolean = { type: Boolean, required: true}

/**
 * Boolean with no restrictions.
 */
module.exports.nonRequiredBoolean = {type: Boolean}

// -----------------------------------------------------------------------------------------------
// ------------------------------------------- Custom -------------------------------------------
// -----------------------------------------------------------------------------------------------

/**
 * landmark with lat and long altitudes
 */
module.exports.landMark = { 
    lat: module.exports.requiredSmallString,
    long: module.exports.requiredSmallString
};