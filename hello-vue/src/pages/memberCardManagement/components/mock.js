class Member {
  constructor(idx) {
    this.id = `${10000000 + idx}`;
    this.name = `周杰伦${idx}`;
    this.phone = 12345678000 + idx;
    this.cardReadonly = `read_only_${1020304050607000 - idx}`;
    this.cardWritable = `writable_${3334440607000 - idx}`;
    this.labels = [this.name, '自取柜', '爱喝饮料不爱喝水'];
    if (idx % 3) this.labels.push('友朋', '深圳户口');
    this.amount = 2000 - ((100 * idx) % 2000);
    this.createAt = 1610000000 + 1000 * idx;
    this.status = idx % 3; // 0 使用中 1 停用 2 未认证激活
    // ===== 新增 =====
    this.depositAmount = (20 + idx) * 100;
    this.depositWay = idx % 3;
    this.depositTime = 1610000000 + 1000 * idx;
    this.depositOperator = `JJ Lin ${200 - idx}`;
  }
}

const members = [];

for (let i = 0; i < 168; i += 1) members.push(new Member(i));

const request = (params, db) => {
  console.log('request params is', JSON.stringify(params, null, 2));
  const { page, pageSize } = params;
  const start = pageSize * (page - 1);
  const end = start + pageSize;
  return {
    total: db.length,
    data: db.slice(start, end),
  };
};

const wrapRequest = params =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(request(params, members));
    }, 50 * params.pageSize);
  });

export default wrapRequest;
