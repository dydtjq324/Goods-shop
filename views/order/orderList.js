getUser(); //user 정보 받기

// user 정보 받는 함수
async function getUser() {
  const res = await fetch('/api/users', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }
  const userData = await res.json();
  const userId = userData.data.id;
  getUserOrderList(userId);
}

// 현재 주문한 내역 정보 받기
async function getUserOrderList(userId) {
  console.log(userId);
  const data = await fetch(`/api/orders/getByuserId/${userId}`).then((res) =>
    res.json(),
  );
  const orderListWrapper = document.getElementById('order-content-box-wrapper');
  for (let i = 0; i < data.length; i++) {
    const element = `
        <div class="main__profile">
            <div class="main__header">
                <div class="top">
                    <h4>주문번호: ${data[i]._id}</h4>&nbsp;&nbsp;
                </div>
                <div class="middle">
                    <ul>
                        <li><b>주문일자</b>: ${data[i].createdAt.slice(
                          0,
                          7,
                        )}</li>
                        <li><b>주문 상태</b>: ${data[i].deliveryStatus}</li>
                        <li><b>결제금액</b>: ${data[i].price}원</b></li>
                    </ul>
                </div>
            </div>
        </div>`;
    orderListWrapper.insertAdjacentHTML('afterbegin', element);
  }
}
