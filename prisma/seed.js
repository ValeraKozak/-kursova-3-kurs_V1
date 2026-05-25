import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { PrismaClient, Role, TransactionType } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const daysAgo = (days) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
};

const monthsAgo = (months, day = 10) => {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(1);
  date.setMonth(date.getMonth() - months);

  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  date.setDate(Math.min(day, lastDayOfMonth));

  return date;
};

const demoUsers = [
  {
    name: 'Demo Admin',
    email: 'admin.demo@finance.local',
    password: 'Demo12345!',
    role: Role.ADMIN,
    categories: [
      { name: 'Salary', type: TransactionType.INCOME },
      { name: 'Investments', type: TransactionType.INCOME },
      { name: 'Rent', type: TransactionType.EXPENSE },
      { name: 'Groceries', type: TransactionType.EXPENSE },
      { name: 'Transport', type: TransactionType.EXPENSE },
      { name: 'Utilities', type: TransactionType.EXPENSE }
    ],
    transactions: [
      { title: 'Monthly salary', amount: '3900.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(11, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1150.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(11, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '132.40', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(11, 13), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '84.30', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(11, 19), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '58.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(11, 24), note: 'Monthly fuel costs' },
      { title: 'ETF dividend', amount: '160.00', type: TransactionType.INCOME, category: 'Investments', date: monthsAgo(10, 9), note: 'Dividend income' },
      { title: 'Monthly salary', amount: '3950.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(10, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1150.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(10, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '141.10', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(10, 12), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '88.50', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(10, 18), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '61.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(10, 23), note: 'Monthly fuel costs' },
      { title: 'Monthly salary', amount: '4000.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(9, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1180.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(9, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '136.70', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(9, 14), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '90.20', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(9, 20), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '63.40', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(9, 26), note: 'Monthly fuel costs' },
      { title: 'ETF dividend', amount: '175.00', type: TransactionType.INCOME, category: 'Investments', date: monthsAgo(8, 8), note: 'Dividend income' },
      { title: 'Monthly salary', amount: '4050.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(8, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1180.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(8, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '145.30', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(8, 13), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '94.10', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(8, 18), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '66.50', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(8, 24), note: 'Monthly fuel costs' },
      { title: 'Monthly salary', amount: '4100.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(7, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1200.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(7, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '151.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(7, 12), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '96.40', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(7, 19), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '68.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(7, 25), note: 'Monthly fuel costs' },
      { title: 'ETF dividend', amount: '182.00', type: TransactionType.INCOME, category: 'Investments', date: monthsAgo(6, 8), note: 'Dividend income' },
      { title: 'Monthly salary', amount: '4150.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(6, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1200.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(6, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '148.60', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(6, 13), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '98.30', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(6, 18), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '67.90', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(6, 24), note: 'Monthly fuel costs' },
      { title: 'Monthly salary', amount: '4180.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(5, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1220.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(5, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '154.20', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(5, 14), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '99.10', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(5, 20), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '69.10', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(5, 26), note: 'Monthly fuel costs' },
      { title: 'ETF dividend', amount: '190.00', type: TransactionType.INCOME, category: 'Investments', date: monthsAgo(4, 9), note: 'Dividend income' },
      { title: 'Monthly salary', amount: '4200.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(4, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1220.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(4, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '157.50', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(4, 13), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '101.20', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(4, 18), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '71.30', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(4, 24), note: 'Monthly fuel costs' },
      { title: 'Monthly salary', amount: '4200.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(3, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1230.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(3, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '143.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(3, 12), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '95.80', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(3, 17), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '64.70', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(3, 23), note: 'Monthly fuel costs' },
      { title: 'ETF dividend', amount: '185.00', type: TransactionType.INCOME, category: 'Investments', date: monthsAgo(2, 8), note: 'Dividend income' },
      { title: 'Monthly salary', amount: '4200.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(2, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1230.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(2, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '149.40', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(2, 13), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '97.60', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(2, 19), note: 'Utilities payment' },
      { title: 'Fuel refill', amount: '66.10', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(2, 24), note: 'Monthly fuel costs' },
      { title: 'Monthly salary', amount: '4200.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(1, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1240.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(1, 7), note: 'Monthly rent payment' },
      { title: 'Supermarket', amount: '145.50', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(1, 12), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '92.10', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(1, 18), note: 'Utilities payment' },
      { title: 'Gas refill', amount: '65.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(1, 24), note: 'Car fuel' },
      { title: 'ETF dividend', amount: '180.00', type: TransactionType.INCOME, category: 'Investments', date: daysAgo(24), note: 'Quarterly payout' },
      { title: 'Monthly salary', amount: '4250.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(0, 5), note: 'Main job salary' },
      { title: 'Apartment rent', amount: '1240.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(0, 7), note: 'Current month rent payment' },
      { title: 'Supermarket', amount: '152.10', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(0, 12), note: 'Groceries for the week' },
      { title: 'Electricity bill', amount: '93.40', type: TransactionType.EXPENSE, category: 'Utilities', date: monthsAgo(0, 17), note: 'Current month utilities' },
      { title: 'Fuel refill', amount: '67.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(0, 22), note: 'Current month fuel costs' }
    ]
  },
  {
    name: 'Olena Demo',
    email: 'olena.demo@finance.local',
    password: 'Demo12345!',
    role: Role.USER,
    categories: [
      { name: 'Salary', type: TransactionType.INCOME },
      { name: 'Freelance', type: TransactionType.INCOME },
      { name: 'Groceries', type: TransactionType.EXPENSE },
      { name: 'Cafe', type: TransactionType.EXPENSE },
      { name: 'Transport', type: TransactionType.EXPENSE },
      { name: 'Health', type: TransactionType.EXPENSE },
      { name: 'Entertainment', type: TransactionType.EXPENSE }
    ],
    transactions: [
      { title: 'Office salary', amount: '2800.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(11, 6), note: 'Monthly salary' },
      { title: 'Product design sprint', amount: '320.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(11, 15), note: 'Freelance project' },
      { title: 'Grocery shopping', amount: '118.20', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(11, 9), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '16.80', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(11, 18), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '21.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(11, 20), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '38.60', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(11, 24), note: 'Medicine and vitamins' },
      { title: 'Concert ticket', amount: '52.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(11, 27), note: 'Weekend event' },
      { title: 'Office salary', amount: '2820.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(10, 6), note: 'Monthly salary' },
      { title: 'Logo design project', amount: '360.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(10, 14), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '121.50', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(10, 10), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '17.40', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(10, 16), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '22.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(10, 19), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '41.20', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(10, 23), note: 'Medicine and vitamins' },
      { title: 'Cinema tickets', amount: '28.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(10, 28), note: 'Friday evening' },
      { title: 'Office salary', amount: '2850.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(9, 6), note: 'Monthly salary' },
      { title: 'Website landing page', amount: '410.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(9, 13), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '126.30', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(9, 8), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '19.10', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(9, 17), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '23.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(9, 21), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '44.00', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(9, 24), note: 'Medicine and vitamins' },
      { title: 'Streaming subscription', amount: '14.90', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(9, 26), note: 'Monthly entertainment' },
      { title: 'Office salary', amount: '2880.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(8, 6), note: 'Monthly salary' },
      { title: 'Brand guideline update', amount: '390.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(8, 15), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '129.00', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(8, 10), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '18.70', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(8, 18), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '23.50', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(8, 20), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '43.10', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(8, 22), note: 'Medicine and vitamins' },
      { title: 'Cinema tickets', amount: '30.20', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(8, 29), note: 'Friday evening' },
      { title: 'Office salary', amount: '2920.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(7, 6), note: 'Monthly salary' },
      { title: 'Mobile app illustrations', amount: '430.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(7, 12), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '131.60', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(7, 9), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '20.40', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(7, 16), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '24.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(7, 21), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '46.30', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(7, 23), note: 'Medicine and vitamins' },
      { title: 'Museum tickets', amount: '24.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(7, 27), note: 'Weekend event' },
      { title: 'Office salary', amount: '2950.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(6, 6), note: 'Monthly salary' },
      { title: 'UI audit project', amount: '470.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(6, 14), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '127.20', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(6, 10), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '19.30', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(6, 15), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '24.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(6, 18), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '45.50', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(6, 21), note: 'Medicine and vitamins' },
      { title: 'Concert ticket', amount: '48.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(6, 28), note: 'Weekend event' },
      { title: 'Office salary', amount: '3000.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(5, 6), note: 'Monthly salary' },
      { title: 'Design workshop', amount: '520.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(5, 13), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '130.40', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(5, 8), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '18.90', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(5, 17), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '25.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(5, 20), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '47.80', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(5, 24), note: 'Medicine and vitamins' },
      { title: 'Cinema tickets', amount: '29.50', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(5, 29), note: 'Friday evening' },
      { title: 'Office salary', amount: '3050.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(4, 6), note: 'Monthly salary' },
      { title: 'Brand assets update', amount: '490.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(4, 12), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '133.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(4, 9), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '19.70', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(4, 16), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '25.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(4, 18), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '46.90', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(4, 22), note: 'Vitamins and medicine' },
      { title: 'Theater ticket', amount: '35.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(4, 27), note: 'Weekend event' },
      { title: 'Office salary', amount: '3070.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(3, 6), note: 'Monthly salary' },
      { title: 'Landing page redesign', amount: '530.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(3, 15), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '128.60', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(3, 10), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '18.10', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(3, 17), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '24.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(3, 21), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '44.20', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(3, 24), note: 'Vitamins and medicine' },
      { title: 'Cinema tickets', amount: '27.80', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(3, 29), note: 'Friday evening' },
      { title: 'Office salary', amount: '3100.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(2, 6), note: 'Monthly salary' },
      { title: 'Design system audit', amount: '460.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(2, 13), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '132.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(2, 11), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '18.40', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(2, 17), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '25.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(2, 20), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '47.25', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(2, 23), note: 'Vitamins and medicine' },
      { title: 'Streaming subscription', amount: '14.90', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(2, 26), note: 'Monthly entertainment' },
      { title: 'Office salary', amount: '3120.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(1, 6), note: 'Monthly salary' },
      { title: 'Logo design project', amount: '450.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(1, 14), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '131.70', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(1, 10), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '18.00', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(1, 18), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '25.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(1, 21), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '45.80', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(1, 24), note: 'Vitamins and medicine' },
      { title: 'Cinema tickets', amount: '29.20', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(1, 27), note: 'Friday evening' },
      { title: 'Office salary', amount: '3150.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(0, 6), note: 'Monthly salary' },
      { title: 'Mobile app polish', amount: '480.00', type: TransactionType.INCOME, category: 'Freelance', date: monthsAgo(0, 13), note: 'Freelance payment' },
      { title: 'Grocery shopping', amount: '136.20', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(0, 9), note: 'Products for the week' },
      { title: 'Coffee with friends', amount: '19.50', type: TransactionType.EXPENSE, category: 'Cafe', date: monthsAgo(0, 16), note: 'Weekend meetup' },
      { title: 'Metro card top-up', amount: '26.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(0, 19), note: 'Public transport' },
      { title: 'Pharmacy order', amount: '49.00', type: TransactionType.EXPENSE, category: 'Health', date: monthsAgo(0, 22), note: 'Vitamins and medicine' },
      { title: 'Cinema tickets', amount: '31.00', type: TransactionType.EXPENSE, category: 'Entertainment', date: monthsAgo(0, 28), note: 'Friday evening' }
    ]
  },
  {
    name: 'Taras Demo',
    email: 'taras.demo@finance.local',
    password: 'Demo12345!',
    role: Role.USER,
    categories: [
      { name: 'Salary', type: TransactionType.INCOME },
      { name: 'Bonus', type: TransactionType.INCOME },
      { name: 'Rent', type: TransactionType.EXPENSE },
      { name: 'Groceries', type: TransactionType.EXPENSE },
      { name: 'Sport', type: TransactionType.EXPENSE },
      { name: 'Education', type: TransactionType.EXPENSE },
      { name: 'Transport', type: TransactionType.EXPENSE }
    ],
    transactions: [
      { title: 'Monthly salary', amount: '2450.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(11, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '820.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(11, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '109.20', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(11, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '35.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(11, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '60.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(11, 20), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '14.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(11, 26), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2480.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(10, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '220.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(10, 18), note: 'Team KPI bonus' },
      { title: 'Apartment rent', amount: '820.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(10, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '111.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(10, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '35.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(10, 16), note: 'Monthly plan' },
      { title: 'Online course', amount: '0.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(10, 21), note: 'No course payment this month' },
      { title: 'Taxi ride', amount: '15.40', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(10, 24), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2520.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(9, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '840.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(9, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '114.50', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(9, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '36.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(9, 17), note: 'Monthly plan' },
      { title: 'Online course', amount: '65.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(9, 22), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '15.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(9, 26), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2550.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(8, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '260.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(8, 19), note: 'Sprint delivery bonus' },
      { title: 'Apartment rent', amount: '840.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(8, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '117.60', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(8, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '36.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(8, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '72.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(8, 21), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '16.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(8, 25), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2580.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(7, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '860.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(7, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '115.90', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(7, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '38.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(7, 16), note: 'Monthly plan' },
      { title: 'Online course', amount: '70.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(7, 20), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '15.80', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(7, 27), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2620.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(6, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '300.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(6, 18), note: 'Quarter bonus' },
      { title: 'Apartment rent', amount: '860.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(6, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '118.40', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(6, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '38.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(6, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '75.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(6, 22), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '16.10', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(6, 24), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2650.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(5, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '880.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(5, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '120.30', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(5, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '39.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(5, 16), note: 'Monthly plan' },
      { title: 'Online course', amount: '68.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(5, 21), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '16.80', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(5, 26), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2680.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(4, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '320.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(4, 17), note: 'Release bonus' },
      { title: 'Apartment rent', amount: '880.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(4, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '121.90', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(4, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '40.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(4, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '74.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(4, 20), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '17.20', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(4, 25), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2700.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(3, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '900.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(3, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '118.30', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(3, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '40.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(3, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '75.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(3, 20), note: 'React course' },
      { title: 'Taxi ride', amount: '16.50', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(3, 24), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2720.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(2, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '350.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(2, 18), note: 'Team KPI bonus' },
      { title: 'Apartment rent', amount: '900.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(2, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '119.10', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(2, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '40.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(2, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '76.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(2, 22), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '16.90', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(2, 25), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2740.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(1, 4), note: 'Backend developer salary' },
      { title: 'Apartment rent', amount: '900.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(1, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '120.80', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(1, 12), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '41.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(1, 16), note: 'Monthly plan' },
      { title: 'Online course', amount: '74.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(1, 21), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '17.00', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(1, 26), note: 'Late evening trip' },
      { title: 'Monthly salary', amount: '2760.00', type: TransactionType.INCOME, category: 'Salary', date: monthsAgo(0, 4), note: 'Backend developer salary' },
      { title: 'Performance bonus', amount: '380.00', type: TransactionType.INCOME, category: 'Bonus', date: monthsAgo(0, 18), note: 'Team KPI bonus' },
      { title: 'Apartment rent', amount: '920.00', type: TransactionType.EXPENSE, category: 'Rent', date: monthsAgo(0, 8), note: 'Shared apartment' },
      { title: 'Supermarket', amount: '123.40', type: TransactionType.EXPENSE, category: 'Groceries', date: monthsAgo(0, 11), note: 'Food and supplies' },
      { title: 'Gym membership', amount: '41.00', type: TransactionType.EXPENSE, category: 'Sport', date: monthsAgo(0, 15), note: 'Monthly plan' },
      { title: 'Online course', amount: '78.00', type: TransactionType.EXPENSE, category: 'Education', date: monthsAgo(0, 21), note: 'Learning budget' },
      { title: 'Taxi ride', amount: '17.80', type: TransactionType.EXPENSE, category: 'Transport', date: monthsAgo(0, 25), note: 'Late evening trip' }
    ]
  }
];

async function seedDemoUser(userData) {
  const passwordHash = await bcrypt.hash(userData.password, 10);

  const user = await prisma.user.upsert({
    where: { email: userData.email },
    update: {
      name: userData.name,
      passwordHash,
      role: userData.role
    },
    create: {
      name: userData.name,
      email: userData.email,
      passwordHash,
      role: userData.role
    }
  });

  await prisma.transaction.deleteMany({
    where: { userId: user.id }
  });

  await prisma.category.deleteMany({
    where: { userId: user.id }
  });

  await prisma.category.createMany({
    data: userData.categories.map((category) => ({
      name: category.name,
      type: category.type,
      userId: user.id
    }))
  });

  const categories = await prisma.category.findMany({
    where: { userId: user.id }
  });

  const categoryMap = new Map(
    categories.map((category) => [`${category.type}:${category.name}`, category.id])
  );

  await prisma.transaction.createMany({
    data: userData.transactions.map((transaction) => ({
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      date: transaction.date,
      note: transaction.note,
      userId: user.id,
      categoryId: categoryMap.get(`${transaction.type}:${transaction.category}`) ?? null
    }))
  });

  return {
    email: user.email,
    role: user.role,
    categories: userData.categories.length,
    transactions: userData.transactions.length
  };
}

async function main() {
  const summaries = [];

  for (const demoUser of demoUsers) {
    summaries.push(await seedDemoUser(demoUser));
  }

  console.log('Demo data created successfully.');
  for (const summary of summaries) {
    console.log(
      `- ${summary.email} (${summary.role}): ${summary.categories} categories, ${summary.transactions} transactions`
    );
  }
  console.log('Demo password for all seeded users: Demo12345!');
}

main()
  .catch((error) => {
    console.error('Failed to seed demo data.');
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
