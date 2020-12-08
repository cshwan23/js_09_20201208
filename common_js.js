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




















