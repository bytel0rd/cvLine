var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userLoginSchema = new schema({
  emailAddress: {type: String, unique: true, required:true},
  password: {type:String, required:true}
});


var userBioSchema = new schema({
  owner_ID: {type: ObjectId,ref: userLogins},
  passportUrl: String,
  fullName: String,
  Gender: String,
  PhoneNo: String,
  emailAddress: String,
  DOB: String,
  cityOfBirth: String,
  localGovt: String,
  stateOfOrigin: String,
  Country: String,
  streetAddress: String,
  cityAddress: String,
  stateAddress: String,
  WorkExperience:String,
  EduAndQual:{
      Academic: String,
      Cerifications: String
  },
  AreaOfExp:String,
  SkillHobbies:String,
  langTechSkill:String,
  personalSummary:String
});

userBioSchema.plugin(textSearch);
userBioSchema.index({"$**":"text"});

// userBioSchema.index({
//   fullName: 'fullName',
//   EduAndQual:{
//     Academic: 'Academic',
//     Cerifications:'Cerifications'
//   },
//   AreaOfExp: 'AreaOfExp',
//   SkillHobbies: 'SkillHobbies',
//   langTechSkill: 'langTechSkill',
//   WorkExperience: 'WorkExperience'
// });

var querySchema = schema({
  query: String,
  date: {type: Date , default: Date.now()}
});

var userLogins = mongoose.model('userLogins',userLoginSchema);
var userBios = mongoose.model("userBios",userBioSchema);
var querys = mongoose.model("querys", querySchema);
module.exports = {
  userLogins: userLogins,
  userBios: userBios,
  querys: querys
};
