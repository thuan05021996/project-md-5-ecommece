import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}
  async create(createBillDto: any) {
    // console.log(createBillDto)
    const newBill = await this.billRepository
      .createQueryBuilder()
      .insert()
      .into(Bill)
      .values({
        user: createBillDto.user_id,
        phone: createBillDto.phone,
        address: createBillDto.address,
        created_at: createBillDto.dayBill,
        total_money: createBillDto.totalMoney,
        nameBill: createBillDto.name,
      })
      .execute();
    // console.log(newBill)
    return newBill.raw.insertId;
  }

  async findAll() {
    const listbill = await this.billRepository.find();
    return listbill;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  async update(id: number) {
    await this.billRepository.update({ id: id }, { status: 'Đã xác nhận' });
    return;
  }

  async UserUpdate(id: number) {
    await this.billRepository.update({ id: id }, { status: 'Huỷ' });
    return;
  }

  async getBillByUser(id: number) {
    const listbill = await this.billRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: id,
        },
      },
    });
    return listbill;
  }

  async getRecentTotalBills() {
    const date = new Date();
    // console.log(date);
    const formattedDate = date.toISOString().split('T')[0];
    // console.log(formattedDate);
    // lấy doanh thu của 1 ngày
    const totalMoneyToday = await this.billRepository
      .createQueryBuilder()
      .select('SUM(bill.total_money)', 'tong_tien_hoa_don')
      .where("bill.status = 'Đã xác nhận'")
      .andWhere('bill.created_at = :formattedDate', { formattedDate })
      .getRawOne();

    const recentTotalBills = await this.billRepository
      .createQueryBuilder()
      .select('DATE(bill.created_at)', 'ngay')
      .addSelect('SUM(bill.total_money)', 'tong_hoa_don')
      .where("bill.status = 'Đã xác nhận'")
      .groupBy('DATE(bill.created_at)')
      .orderBy('DATE(bill.created_at)', 'DESC')
      .take(7)
      .limit(7)
      .getRawMany();

    return {
      totalMoneyToday: totalMoneyToday.tong_tien_hoa_don,
      recentTotalBills: recentTotalBills,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
