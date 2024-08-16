import React from "react";

const SelectStation = ({ onSeleceted }) => {
    // 옵션 목록
    const options = [
        { value: 95, label: '다대포해수욕장' },
        { value: 96, label: '다대포항' },
        { value: 97, label: '낫개' },
        { value: 98, label: '신장림' },
        { value: 99, label: '장림' },
        { value: 100, label: '동매' },
        { value: 101, label: '신평' },
        { value: 102, label: '하단' },
        { value: 103, label: '당리' },
        { value: 104, label: '사하' },
        { value: 105, label: '괴정' },
        { value: 106, label: '대티' },
        { value: 107, label: '서대신' },
        { value: 108, label: '동대신' },
        { value: 109, label: '토성' },
        { value: 110, label: '자갈치' },
        { value: 111, label: '남포' },
        { value: 112, label: '중앙' },
        { value: 113, label: '부산역' },
        { value: 114, label: '초량' },
        { value: 115, label: '부산진' },
        { value: 116, label: '좌천' },
        { value: 117, label: '범일' },
        { value: 118, label: '범내골' },
        { value: 119, label: '서면' },
        { value: 120, label: '부전' },
        { value: 121, label: '양정' },
        { value: 122, label: '시청' },
        { value: 123, label: '연산' },
        { value: 124, label: '교대' },
        { value: 125, label: '동래' },
        { value: 126, label: '명륜' },
        { value: 127, label: '온천장' },
        { value: 128, label: '부산대' },
        { value: 129, label: '장전' },
        { value: 130, label: '구서' },
        { value: 131, label: '두실' },
        { value: 132, label: '남산' },
        { value: 133, label: '범어사' },
        { value: 134, label: '노포' },
        { value: 201, label: '장산' },
        { value: 202, label: '중동' },
        { value: 203, label: '해운대' },
        { value: 204, label: '동백' },
        { value: 205, label: '벡스코' },
        { value: 206, label: '센텀시티' },
        { value: 207, label: '민락' },
        { value: 208, label: '수영' },
        { value: 209, label: '광안' },
        { value: 210, label: '금련산' },
        { value: 211, label: '남천' },
        { value: 212, label: '경성대부경대' },
        { value: 213, label: '대연' },
        { value: 214, label: '못골' },
        { value: 215, label: '지게골' },
        { value: 216, label: '문현' },
        { value: 217, label: '국제금융센터부산은행' },
        { value: 218, label: '전포' },
        { value: 219, label: '서면' },
        { value: 220, label: '부암' },
        { value: 221, label: '가야' },
        { value: 222, label: '동의대' },
        { value: 223, label: '개금' },
        { value: 224, label: '냉정' },
        { value: 225, label: '주례' },
        { value: 226, label: '감전' },
        { value: 227, label: '사상' },
        { value: 228, label: '덕포' },
        { value: 229, label: '모덕' },
        { value: 230, label: '모라' },
        { value: 231, label: '구남' },
        { value: 232, label: '구명' },
        { value: 233, label: '덕천' },
        { value: 234, label: '수정' },
        { value: 235, label: '화명' },
        { value: 236, label: '율리' },
        { value: 237, label: '동원' },
        { value: 238, label: '금곡' },
        { value: 239, label: '호포' },
        { value: 240, label: '증산' },
        { value: 241, label: '부산대양산캠퍼스' },
        { value: 242, label: '남양산' },
        { value: 243, label: '양산' },
        { value: 302, label: '망미' },
        { value: 303, label: '배산' },
        { value: 304, label: '물만골' },
        { value: 305, label: '연산' },
        { value: 306, label: '거제' },
        { value: 307, label: '종합운동장' },
        { value: 308, label: '사직' },
        { value: 309, label: '미남' },
        { value: 310, label: '만덕' },
        { value: 311, label: '남산정' },
        { value: 312, label: '숙등' },
        { value: 313, label: '덕천' },
        { value: 314, label: '구포' },
        { value: 315, label: '강서구청' },
        { value: 316, label: '체육공원' },
        { value: 317, label: '대저' },
        { value: 402, label: '동래' },
        { value: 403, label: '수안' },
        { value: 404, label: '낙민' },
        { value: 405, label: '충렬사' },
        { value: 406, label: '명장' },
        { value: 407, label: '서동' },
        { value: 408, label: '금사' },
        { value: 409, label: '반여농산물시장' },
        { value: 410, label: '석대' },
        { value: 411, label: '영산대' },
        { value: 412, label: '윗반송' },
        { value: 413, label: '고촌' },
        { value: 414, label: '안평' },
    ];

    // 셀렉트 박스의 변경 이벤트 핸들러
    const handleChange = (event) => {
        onSeleceted(event.target.value);
    };

    return (
        <div>
            <label htmlFor="select-box">역 선택 : </label>
            <select onChange={handleChange} >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectStation;
