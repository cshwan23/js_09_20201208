# js_09_20201208
js 유효성 체크 + js 파일 공용함수 수입방법


      <!-- 
      ----------------------------

      ----------------------------
        자바스크립트로 HTML 입력양식에 입력된(선택된) 데이터의 ***[유효성 체크]***
        유효성체크란 DB에 저장될 수 있는 데이터인가 아닌가를 체크하는 일.
        ----------------------------
        자바스크립트로 유효성 체크 시 장점
        ----------------------------
          클라이언트 컴퓨터에서 자바스크립트가 실행되므로 서버에 부담을 주지 않는다.
        ----------------------------
        자바스크립트로 유효성 체크 시 단점
        ----------------------------
          클라이언트 컴퓨터에서 자바스크립트가 실행되므로 자바스크립트 소스를 볼 수 있다.
          소스의 보안에 관련된 내용이 있거나 회사 고유 업무 내용이 있으면 허걱..클 난다.
        ----------------------------
        서버에서 자바로 유효성 체크 시 장점
        ----------------------------
          자바 소스의 보안에 관련된 내용이있거나 회사 고유 업무 내용이 있어도 클라이언트에게 노출되지않는다.
        ----------------------------
        자바스크립트로 유효성 체크 시 단점
        ----------------------------
          서버에 부담을 준다. 서버 퍼포먼스에 영향을 준다.

      -->
      <html>
      <head><meta charset="utf-8">
        <title></title>


        <!--------------------------------------------- 
        공용함수 수입 방법.(html에 <--js파일을 수입)
        -----------------------------------------------
        형식 : <script src="js파일명.js(같은폴더안)"></script>
        ----------------------------------------------- 	
        공용함수 이런식으로 수입해서 쓰는게 진정한 공용함수 사용법이다.
        파일안의 데이터를 수입해다가 여기에 넣어달라는 얘기
        이안에 함수가 들어간 것과 똑같다.
        함수를 바깥으로 빼고 여기다 수입시키는 것과 똑같다.
        단. html과 js파일과 동일한 폴더안에 들어가야 한다.
        ---------------------------------------------->
        <script type="text/javascript" src="common_js.js"></script>


        <script type="text/javascript">

          //*****************************************
          // 존재하는 년월일 인지의 여부를 체크하는 함수
          //*****************************************
          function checkBirthday(){
            // 선택한 생일년도 얻기
            var year = document.memberRegForm.birth_year.value;
            // 선택한 생일월 얻기
            var month = document.memberRegForm.birth_month.value;
            // 선택한 생일일 얻기
            var date = document.memberRegForm.birth_date.value;

            //만약에 년도가 없거나 월이 없거나 일이 없으면 함수 중단하기
            if(year==""||month==""||date==""){
              return;
            }

            if (is_valid_YMD(year, month, date)==false){

              var xxx = confirm("존재하지 않는 일수입니다. 마지막 일수로 바꿀까요?");

              if(xxx){
                // 선택한 년월의 마지막 날짜를 관리하는 Date 객체 생성하기 
                var myLastDate = new Date(year,month,0);
                // 선택한 년월의 마지막 날짜 구하기 
                var myLastDate_1 = myLastDate.getDate();
                // name=birth_date 가진 태그에 value값으로 마지막 날짜 설정하기 
                document.memberRegForm.birth_date.value = myLastDate_1;

              }else{
                document.memberRegForm.birth_year.value="";
                document.memberRegForm.birth_month.value="";
                document.memberRegForm.birth_date.value="";
              }

            }

          }





          //*****************************************
          // 저장 버튼을 누르면 호출되는 checkForm 함수 선언
          // 입력양식들의 유효성 체크를 한 후 모두 유효성에 합당하면
          // 서버로 전송할 것이다
          //*****************************************
          function checkForm(){
            // alert(document.memberRegForm.is_confirm.length);
            // return;


            //+++++++++++++++++++++++++
            // 아이디값 유효성 체크하기
            //+++++++++++++++++++++++++
            //사용자가 웹브라우저 화면에서 입력한 [아이디값]을 가져와 uid 변수에 저장
            //------------------------------
            var uid = document.memberRegForm.uid.value;

            if(checkID(uid)==false){
              document.memberRegForm.uid.value = "";
              document.memberRegForm.uid.focus();
              return;
            }




            //+++++++++++++++++++++++++
            // 암호값 유효성 체크하기
            //+++++++++++++++++++++++++
            //사용자가 웹브라우저 화면에서 입력한 [암호값]을 가져와 pwd 변수에 저장
            //------------------------------
            var pwd = document.memberRegForm.pwd.value;

            if(checkPwd(pwd)==false){
              document.memberRegForm.pwd.value = "";
              document.memberRegForm.pwd.focus();
              return;
            }



            //+++++++++++++++++++++++++
            // 암호값 확인 유효성 체크하기
            //+++++++++++++++++++++++++
            //사용자가 웹브라우저 화면에서 입력한 [암호값]을 가져와 pwd 변수에 저장
            //------------------------------
            var pwd_confirm = document.memberRegForm.pwd_confirm.value;

            //------------------------------
            // 암호와 암호확인값이 다르면 함수 중단하기.
            //------------------------------
            if(pwd != pwd_confirm){
              alert("[암호]와 [암호확인값]이 다릅니다.")
              document.memberRegForm.pwd_confirm.value = "";
              document.memberRegForm.pwd_confirm.focus();
              return;
            }




            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 스킬 유효성 체크. 1개 이상 선택하기
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            //getCheckedCnt 함수 호출하여 얻은 스킬의 체크 개수가 0개면 경고하고 함수 중단하기
            //------------------------------

            if(getCheckedCnt(document.memberRegForm.skill)==0){
              alert("스킬은 한개 이상 선택하세요~");
              return;
            }




            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 학력 유효성 체크. 1개 선택하기
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            //getCheckedCnt 함수 호출하여 얻은 학력의 체크 개수가 0개면 경고하고 함수 중단하기
            //------------------------------
            if(getCheckedCnt(document.memberRegForm.school)==0){
              alert("최종학력은 한개 선택하세요~");
              return;
            }

                // 위 코딩은 아래처럼 원시적으로도 가능하다
                // <방법1>
                // var schoolCnt = 0;
                // if(document.memberRegForm.school[0].checked==true){schoolCnt++;}
                // if(document.memberRegForm.school[1].checked==true){schoolCnt++;}
                // if(document.memberRegForm.school[2].checked==true){schoolCnt++;}
                // if(schoolCnt==0){
                // 	alert("최종학력은 한개 선택하세요~");
                //  return;
                // }


                // <방법2>
                // var schoolCnt = 0;
                // for(var i=0; i<document.memberRegForm.school.length;i++){
                // if(document.memberRegForm.school[0].checked==true){schoolCnt++;}
                // if(document.memberRegForm.school[1].checked==true){schoolCnt++;}
                // if(document.memberRegForm.school[2].checked==true){schoolCnt++;}
                // }
                // if(schoolCnt==0){
                // 	alert("최종학력은 한개 선택하세요~");
                //  return;
                // }


            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 거주지 유효성 체크.
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            //선택한 [거주지]를 변수 addr 에 저장.
            //------------------------------
            var addr = document.memberRegForm.addr.value;

            if(addr==""){
              alert("거주지 입력요망");
              return;
            }


            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 생년월일 유효성 체크.
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            var birth_year = document.memberRegForm.birth_year.value;
            var birth_month = document.memberRegForm.birth_month.value;
            var birth_date = document.memberRegForm.birth_date.value;

            checkBirthday();// 한번더 확인해 줘야한다. 테스트했을때 잘못 날짜가 입력될수있으므로 

            if(birth_year==""){
              alert("생일 년도 입력요망");
              return;
            }
            if(birth_month==""){
              alert("생일 월 입력요망");
              return;
            }
            if(birth_date==""){
              alert("생일 일 입력요망");
              return;
            }



            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 주민번호 유효성 체크.
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            var jumin_num = document.memberRegForm.jumin_num.value;

            if(is_valid_jumin_num(jumin_num)==false){

              document.memberRegForm.jumin_num.value="";
              return;
            }
            //------------------------------
            // 주민번호 입력되지 않았으면 경고하고 함수 중단.
            //------------------------------
              // if(checkPattern(jumin_num,/^[0-9]{7}$/,"주민번호는 숫자만 7개 입력해야함")==false){
              // 	document.memberRegForm.jumin_num.value="";
              // 	return;
              // }


              // var gender = jumin_num.substr(6,1);
              // var year = jumin_num.substr(0,2);

              // 	if(gender=="1"||gender=="2"){
              // 		year="19"+year;
              // 	}else{
              // 		year="20"+year;
              // 	}

              // var month = jumin_num.substr(2,2);
              // var date = jumin_num.substr(4,2);

              // // alert( gender+ "" + year + "" + month +"" + date);
              // // return;

              // if(is_valid_YMD(year,month,date)==false){
              // 	alert("주민번호 입력이 잘못 되었습니다.");
              // 	document.memberRegForm.jumin_num.value="";
              // 	return;
              // }

              // //-----------------------------
              // //주민번호가 미래면 경고하고 함수 중단하기
              // //-----------------------------
              // if(is_future(year.month.date)){
              // 	alert("주민번호가 미래입니다. 다시 입력해주세요!");
              // 	document.memberRegForm.jumin_num.value="";
              // 	return;
              // }





            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 사진 유효성 체크.
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 선택한 [파일명]을 변수 pic에 저장.
            //------------------------------
            var pic = document.memberRegForm.pic.value;
            //------------------------------
            // 파일이 선택되지 않았으면 경고하고 함수 중단.
            //------------------------------
            if (pic==""){
              alert("사진 첨부는 필수입니다.");
              return;
            }



            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 경력 유효성 체크.
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            var company_name = document.memberRegForm.company_name.value;
            var jikup = document.memberRegForm.jikup.value;
            var salary = document.memberRegForm.salary.value;

            // 회사명이 있거나 직급이 있거나 연봉이 있으면 (셋중에 하나라도 들어있으면 들어간다.)
            if(isEmpty(company_name)==false||isEmpty(jikup)==false||isEmpty(salary)==false){

              //1. 회사명이 있는지 
              //회사명이 비어있거나 공백이 하나라도 있으면 경고. 함수 중단.
              if(new RegExp(/^[^]+$/).test(company_name)==false){
                alert("(경력이 있다면)회사명이 비어있거나 공백이 하나라도 있으면 안됩니다.");
                document.memberRegForm.company_name.value="";
                return;
              }
              if(new RegExp(/^[가-힣0-9a-zA-Z]+$/).test(company_name)==false){
                alert("회사명은 한글과 숫자, 영어로만 구성되어야 합니다.");
                document.memberRegForm.company_name.value="";
                return;
              }

              //+1개이상
              //*0개이상
              //2. 연봉이 있는지
              // 연봉이 비어있거나 공백이하나라도 있거나 숫자가 아니면 경고. 함수 중단.
              if(new RegExp(/^[^]+$/).test(salary)==false){
                alert("(경력이 있다면)연봉이 비어있거나 공백이 있으면 안됩니다.");
                document.memberRegForm.salary.value="";
                return;
              }

              if(new RegExp(/^[1-9][0-9]*$/).test(salary)==false){
                alert("연봉은 숫자로 구성되어야 합니다.");
                document.memberRegForm.salary.value="";
                return;
              }


            }




            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 숙지사항이 체크가 안되어 있으면 경고하고 함수 중단.
            //++++++++++++++++++++++++++++++++++++++++++++++++++

            var is_confirm = document.memberRegForm.is_confirm;

            if(getCheckedCnt(document.memberRegForm.is_confirm)==0){
              alert("숙지사항 체크는 필수입니다.");
              return;
            }


            //++++++++++++++++++++++++++++++++++++++++++++++++++
            // 웹서버로 form 태그 내부의 모든 입력 양식의 name 값과 value 값을 전송하기 
            //++++++++++++++++++++++++++++++++++++++++++++++++++
            document.memberRegForm.submit();


          }

        </script>
      </head>
      <body>
        <!----------------------------------------------------->
        <!-- 입력 양식 관련 태그 들을 하나로 묶기 위한 form 태그 선언하기 -->
        <!----------------------------------------------------->
        <form name="memberRegForm" action="http://www.naver.com" enctype="multipart/form-data" method="post">
          <!------------------------------->
          <table border="1" cellpadding="5">
          <!------------------------------->
            <caption>회원가입</caption>
            <tr>
              <th>아이디
              <td><input type="text" name="uid" size="20" maxlength="15" value="">
            </tr>
            <!----------------------------------------------------->
            <tr>
              <th>암호
              <td><input type="text" name="pwd" size="20" maxlength="15" value="">
            </tr>
            <!----------------------------------------------------->
            <tr>
              <th>암호확인
              <td><input type="text" name="pwd_confirm" size="20" maxlength="15" value="">
            </tr>
            <!----------------------------------------------------->
            <tr>
              <th>소유스킬
              <td>
                <input type="checkbox" name="skill" value="Java">Java
                <input type="checkbox" name="skill" value="JSP">JSP
                <input type="checkbox" name="skill" value="Spring">Spring
                <input type="checkbox" name="skill" value="Oracle">Oracle
                <input type="checkbox" name="skill" value="mybatis">mybatis
            </tr>

            <!----------------------------------------------------->
            <tr>
              <th>최종학력
              <td>
                <input type="radio" name="school" value="고졸">고졸
                <input type="radio" name="school" value="중졸">중졸
                <input type="radio" name="school" value="대졸">대졸
            </tr>

            <!----------------------------------------------------->
            <tr>
              <th>거주지
              <td>
                <select name="addr">
                  <option value="">--선택--
                  <option value="서울">서울
                  <option value="경기">경기
                  <option value="인천">인천
                </select>					
            </tr>

            <!----------------------------------------------------->
            <tr><!-- onchange : 내용물을 바꿔 선택했을때 -->
              <th>생일
              <td>
                <select name="birth_year" onchange="checkBirthday();">
                  <script type="text/javascript">
                    document.write("<option value=''>");

                    var today = new Date()
                    var thisYear = today.getFullYear();


                    for(var i=thisYear; i>=1990; i--){
                      document.write("<option value='"+i+"'>"+i);
                    }
                    // <역순>
                    // for(var i=1990; i<=thisYear; i++){
                    // 	 document.write("<option value='"+i+"'>"+i);
                    // }
                  </script>
                </select>년

                <select name="birth_month" onchange="checkBirthday();">
                  <script type="text/javascript">
                    document.write("<option value=''>");
                    for(var i=1; i<=12;i++){
                      if(i>=10){
                      document.write("<option value='"+i+"'>"+i);
                      }else{
                      document.write("<option value='0"+i+"'>"+i);
                      }
                    }
                  </script>
                      <!-- 
                      <option value="01">01
                      <option value="02">02
                      <option value="03">03
                      <option value="04">04
                      <option value="05">05
                      <option value="06">06
                      <option value="07">07
                      <option value="08">08
                      <option value="09">09
                      <option value="10">10
                      <option value="11">11
                      <option value="12">12 
                      -->
                </select>월		
                <select name="birth_date" onchange="checkBirthday();">
                  <script type="text/javascript">
                    document.write("<option value=''>");
                    for(var i=1; i<=31;i++){
                      if(i>=10){
                      document.write("<option value='"+i+"'>"+i);
                      }else{
                      document.write("<option value='0"+i+"'>"+i);
                      }
                    }
                  </script>

                </select>일	
            </tr>
            <!----------------------------------------------------->
            <tr>
              <th>주민번호
              <td>
                <input type="text" name="jumin_num" value="" maxlength="7">
            </tr>		
            <!----------------------------------------------------->
            <tr>
              <th>사진
              <td>
                <input type="file" name="pic">	
            </tr>
            <!----------------------------------------------------->
            <tr>
              <th>경력 
              <td>
                <!-- *필수긴 한데 
                1. 경력이 있다면 회사명/연봉을 꼭 입력해달라
                2. 경력이 없다면 셋다 비워달라
                 -->
                *회사명<input type="text" name="company_name">
                직급<select name="jikup">
                    <option value="">--선택--
                    <option value="과장">과장
                    <option value="대리">대리
                    <option value="주임">주임
                    <option value="사원">사원

                </select>
                *연봉<input type="text" name="salary">	
            </tr>

            <!----------------------------------------------------->
            <!-- 체크박스에 선택사항이 하나일때 메모리구조 상상도 -->
            <tr>
              <th>숙지사항
              <td>
                입력하신 개인 정보는 회사 소유 입니다.
                <input type="checkbox" name="is_confirm" value="확인">확인
            </tr>



          <!------------------------------->
          </table>
          <!------------------------------->
        </form>

        <input type="button" value="저장" onclick="checkForm();">
      </body>
      </html>

      <!-- 

        1. 각자 컴퓨터로 네이버 서버에 접속 -> 네이버 초기화면에서 html을 받았다.
        2. 자바



      //js_21_.js 파일
       -->
          //*****************************************
          // 합당한 주민번호인지 체크하는 함수 선언하기 
          //*****************************************
          function is_valid_jumin_num(jumin_num){

            //----------------------------------------------
            // 주민번호 7개 숫자로 구성되지 않으면 경고하고 함수 중단하기 
            //----------------------------------------------
            if(checkPattern(
                jumin_num
                ,/^[0-9]{7}$/
                ,"주민번호는 숫자만 7개 입력해야함"
                )==false
              ){
              return false;
            }

            // 주민번호에서 7번째 숫자 구하기
            var gender = jumin_num.substr(6,1);
            // 주민번호에서 년도 구하기
            var year = jumin_num.substr(0,2);
            // 만약 주민번호 7번째 숫자가 1또는 2면 년도 앞에 19 붙이기 
            if (gender=="1"||gender=="2"){
              year = "19" + year;
            // 만약 주민번호 7번째 숫자가 3 또는 4면 년도 앞에 20 붙이기 
            }else if(gender=="3"||gender=="4"){
              year = "20" + year;
            }else{
              alert("주민번호 7번째는 1~4야야 합니다.");
              return false;
            }
            // 주민번호에서 월 구하기 
            var month = jumin_num.substr(2,2);
            // 주민번호에서 일 구하기 
            var date = jumin_num.substr(4,2);

            if(is_valid_YMD(year,month,date)==false){
              alert("주민번호가 존재하지 않습니다.");
              return false;
            }
            if(is_future(year,month,date)==true){
              alert("주민번호가 미래입니다 다시 입력해주세요");
              return false;
            }
            return true; 
          }



          //*****************************************
          // 년월일의 미래 날짜 여부 리턴하는 함수 선언하기 
          //*****************************************
          function is_future(year,month,date){
            // 현재 시스템 날짜를 관리하는 데이터 객체 생성하기
            var today = new Date();
            // 매개변수로 들어온 년월일 관리하는 Date 객체 생성하기 

            var xxxday = new Date(
              parseInt(year,10)
              ,parseInt(month,10)-1
              ,parseInt(date,10)
              );

            // 만약 매개변수로 들어온 년월일이 현재 시스템 날짜의 년월일 보다 크면 true 리턴하기
            if(today.getTime()<xxxday.getTime()){
              return true;

            // 그 외의 경우 false 리턴하기 
            }else{
              return false;
            }
          }


          //*****************************************
          // 매개변수로 들어오는 문자열의 패턴을 검사하여 true 또는 false를 리턴하는 함수선언
          //*****************************************
          function checkPattern(
            str,		//검사할 문자열
            regExpObj,	// 문자열의 패턴을 검사할 RegExp 객체
            alertMsg	// 문자열의 패턴이 틀릴 경우 보여줄 alert 상자 안의 경고문자열

            ){
            var result = regExpObj.test(str);
            if(result==false){
              alert(alertMsg);
            }
            return result;
          }






          //*****************************************
          // 아이디의 유효성 체크 결과를 리턴하는 함수 선언하기 
          //*****************************************
          function checkID(str){
            return checkPattern(
              str
              ,/^[a-z][a-z0-9_]{5,14}$/,"[아이디] 입력 규칙에 맞지 않음. 재 입력 바람! \n <1>영소문자 또는 숫자 또는 언더바(_)로 구성되어야.\n<2>글자수는 7-15사이여야함\n<3>첫글자는 영문이여야함.");
          }

          //*****************************************
          // 암호 유효성 체크 결과를 리턴하는 함수 선언하기 
          //*****************************************
          function checkPwd(str){
            return checkPattern(
              str
              ,/^[a-z0-9_]{8,15}$/,"[암호] 입력 규칙에 맞지 않음. 재 입력 바람! \n <1>영소문자 또는 숫자 구성되어야함.\n<2>글자수는 8-15사이여야함");
          }





          //*****************************************
          // checkbox 또는 radio 입력 양식의 체크 개수를 리턴하는 함수 선언
          //*****************************************
          function getCheckedCnt(arrObj){
              // arrObj: checkbox 객체 또는 Radio 객체가 저장된 Array 객체의 메위주가 저장될 매개변수


            var cnt = 0;

            if(arrObj.length==undefined){
              if(arrObj.checked==true){
                ++cnt;
              }
              return cnt;
            }

            for( var i = 0; i<arrObj.length; i++){
              if((arrObj[i].checked)==true){

                cnt++
              }
            }
            return cnt;
          }





          //*****************************************
          // 년월일의 존재 여부 체크
          //*****************************************
          function is_valid_YMD(year, month, date){

            //매개변수로 들어온 숫자 문자를 숫자로 바꾸기
              // 존재하는 년월일인지 체크하기
              // 생일 날짜를 관리하는 Date 객체 생성하기
              // 숫자문자를 정수 숫자로 바꿔주는 함수
              // parseInt( ? ,10) //10은 10진수라는 뜻.
            year = parseInt(year,10);
            month = parseInt(month,10);
            date = parseInt(date,10);


            // 생일 날짜를 관리하는 Date 객체 생성하기
            var birthday = new Date(year, month-1, date);


            // Date 객체에서 년, 월, 일 얻기
            var year2 = birthday.getFullYear();

            var month2 = birthday.getMonth()+1;

            var date2 = birthday.getDate();

            // 만약 년도가 서로 다르거나 또는 월이 서로 다르거나 또는 일이 서로 다르면
            if(year != year2 || month != month2 || date != date2){
              return false;
            }else{
              return true;
            }
          }


          //*****************************************
          // 길이가 없는 문자이거나 공백으로 이루어진 문자이거나 null 이거나 undefined 일 경우 
          // true를 리턴하는 함수 선언하기 
          //*****************************************

          function isEmpty(str){
            var result = false;
            if(str==null||str==undefined){

              result = true;

            }else if(str==""||str.split(" ").join("")==""){

              result = true;

            }
            // }else if( str==""|| new regExp(/^[]+$/).test(str)==true){
            // 	result = true;
            // }

            return result;
          }
























