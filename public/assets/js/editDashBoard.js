$(document).ready(function(){
  $("#fullName").attr('placeholder',"<%= userBio.fullName %>").val("<%= userBio.fullName %>").val();
  $("#emailAddress").attr('placeholder',"<%= userBio.emailAddress %>").val("<%= userBio.emailAddress %>").val();
  $("#phoneNo").attr('placeholder',"<%= userBio.PhoneNo %>").val("<%= userBio.PhoneNo %>").val();
  $("#gender").attr('placeholder',"<%= userBio.Gender %>").val("<%= userBio.Gender %>").val();
  $("#cityOfBirth").attr('placeholder',"<%= userBio.cityOfBirth %>").val("<%= userBio.cityOfBirth %>").val();
  $("#stateOfBirth").attr('placeholder',"<%= userBio.stateOfOrigin %>").val("<%= userBio.stateOfOrigin %>").val();
  $("#countryOfBirth").attr('placeholder',"<%= userBio.Country %>").val("<%= userBio.Country %>").val();
  $("#DOB").attr('placeholder',"<%= userBio.DOB %>").val("<%= userBio.DOB %>").val();
  $("#streetAddress").attr('placeholder',"<%= userBio.streetAddress %>").val("<%= userBio.streetAddress %>").val();
  $("#cityAddress").attr('placeholder',"<%= userBio.cityAddress %>").val("<%= userBio.cityAddress %>").val();
  $("#stateAddress").attr('placeholder',"<%= userBio.stateAddress %>").val("<%= userBio.stateAddress %>").val();
  $("#LGA").attr('placeholder',"<%= userBio.localGovt %>").val("<%= userBio.localGovt %>").val();
  $("#acadQual").attr('placeholder',"<%= userBio.EduAndQual.Academic %>").val("<%= userBio.EduAndQual.Academic %>").val();
  $("#cerifi").attr('placeholder',"<%= userBio.EduAndQual.Cerifications %>").val("<%= userBio.EduAndQual.Cerifications %>").val();
  $("#AOE").attr('placeholder',"<%= userBio.AreaOfExp %>").val("<%= userBio.AreaOfExp %>").val();
  $("#SAH").val("<%= userBio.SkillHobbies %>").val();
  $("#LS").attr('placeholder',"<%= userBio.langTechSkill %>").val("<%= userBio.langTechSkill %>").val();
  $("#WH").attr('placeholder',"<%= userBio.WorkExperience %>").val("<%= userBio.WorkExperience %>").val();
  $("#PS").attr('placeholder',"<%= userBio.personalSummary %>").val("<%= userBio.personalSummary %>").val();

  $('#i_file').change( function() {
//check whether browser fully supports all File API
if (window.File && window.FileReader && window.FileList && window.Blob)
{
//get the file size and file type from file input field
var fsize = $('#i_file')[0].files[0].size;

if(fsize>1048576) //do something if file size more than 1 mb (1048576)
{
    $( '#i_submit').prop( "disabled", true );
    alert(fsize +" bites\nToo big!");

}else{
    var ftype = $('#i_file')[0].files[0].type;
    switch(ftype)
{
    case 'image/png':
    case 'image/jpeg':
    case 'image/pjpeg':
        $( '#i_submit').prop( "disabled", false );
        break;
    default:
        alert('Unsupported File type please Upload a image File!');
        $( '#i_submit').prop( "disabled", true );
}
}
}else{
alert("Please upgrade your browser, because your current browser lacks some new features we need!");

}
});
$('div[contenteditable="true"]').each(function() {
var s=$(this).attr('placeholder');
if (s) {
   var s1=s.replace(/\\n/g, String.fromCharCode(10));
   $(this).attr('placeholder',s1);
}
});
});
