







		function is_valid_jumin_num(jumin_num){

			if(checkPattern(jumin_num,/^[0-9]{7}$/,"주민번호는 숫자만 7개 입력해야합니다.")==false){


				return false;
			}

			var gender = jumin_num.substr(6,1);

			var year = jumin_num.substr(0,2);


			if(gender=="1"||gender=="3"){

				year = "19"+year;
			}else if(gender=="2"||gender=="4"){

				year = "20"+year;
			}else{
				alert("주민번호 7번째는 1~4 숫자여야 합니다.")
				return false;
			}

			var month = jumin_num.substr(2,2);

			var date = jumin_num.substr(4,2);


			if(is_valid_YMD(year,month, date)==false){
				alert("존재하지 않는 생년월일입니다.")
				return false;

			}
			if(is_future(year, month, date)==true){
				alert("주민번호가 미래입니다. 다시입력해주세요");
				return false;
			}

			return true;

		}





		function is_future(year, month, date){

			var today = new Date();

			var xxxday = new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(date,10));

			if(today.getTime()<xxxday.getTime()){
				return true;
			}else{
				return false;
			}

		}





		function isEmpty(str){

			var result = false;

			if(str==null||str==undefined){
				result = true;
			}else if(str==""||str.split(" ").join("")==""){
				result = true;
			}
			return result;

		}





		//--------------------
		//아이디 패턴체크 함수
		//-------------------- 
		function checkPattern(str, regExpObj, alertMsg){
			
			var result = regExpObj.test(str)

			if(result==false){
				alert(alertMsg);
			}

			return result;
		}

		//--------------------
		//아이디 체크 함수
		//-------------------- 
		function checkID(str){
			return checkPattern(str,/^[a-z][a-z0-9_]{5,14}$/
				,"[아이디] 입력 규칙에 맞지 않음. 재입력 바람!"
				);
		}

		//--------------------
		//아이디 체크 함수
		//-------------------- 
		function checkPwd(str){
			return checkPattern(str,/^[a-z0-9]{8,15}$/,"[암호] 입력 규칙에 맞지 않음. 재입력 바람!");
		}

		//--------------------
		// array 객체 수 체크
		//-------------------- 
		function getCheckedCnt(arrObj){
			var cnt = 0;

			if(arrObj.length==undefined){
				if(arrObj.checked==true){
					++cnt;
				}
				return cnt;
			}


			for(var i = 0; i < arrObj.length; i++){
				if((arrObj[i].checked)==true){
					cnt++;
				}
			}
			
			return cnt;

		}

		

		function is_valid_YMD(year, month, date){

			year = parseInt(year,10);
			month = parseInt(month,10);
			date = parseInt(date,10);

			var birthday = new Date(year, month-1, date);

			var year2 = birthday.getFullYear();
			var month2 = birthday.getMonth()+1;
			var date2 = birthday.getDate();

			if(year!=year2||month!=month2||date!=date2){
				return false;
			}else{
				return true;
			}


		}
