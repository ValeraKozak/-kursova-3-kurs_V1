import { useMemo, useState } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LogIn,
  UserPlus,
  Tag,
  CalendarDays,
  RefreshCw
} from 'lucide-react';
import './App.css';

const API_BASE = 'http://localhost:5000/api';

async function api(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

function StatCard({ icon: Icon, title, value, hint }) {
  return (
    <div className="card stat-card">
      <div>
        <div className="muted">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="hint">{hint}</div>
      </div>
      <div className="icon-box">
        <Icon size={20} />
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="section-title">
      <div className="icon-box">
        <Icon size={18} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Підключись до API та увійди в систему.');

  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    type: 'EXPENSE'
  });

  const [transactionForm, setTransactionForm] = useState({
    title: '',
    amount: '',
    type: 'EXPENSE',
    date: new Date().toISOString().slice(0, 16),
    note: '',
    categoryId: ''
  });

  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState({
    income: 0,
    expense: 0,
    balance: 0
  });

  const [statsRange, setStatsRange] = useState({
    startDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10)
  });

  const [stats, setStats] = useState(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => item.type === transactionForm.type);
  }, [categories, transactionForm.type]);

  async function register() {
    try {
      setLoading(true);
      const result = await api('/auth/register', {
        method: 'POST',
        body: registerForm
      });

      setToken(result.data.token);
      setUser(result.data.user);
      setMessage('Реєстрація успішна.');
      await loadAll(result.data.token);
    } catch (error) {
      setMessage(`Помилка реєстрації: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    try {
      setLoading(true);
      const result = await api('/auth/login', {
        method: 'POST',
        body: loginForm
      });

      setToken(result.data.token);
      setUser(result.data.user);
      setMessage('Вхід успішний.');
      await loadAll(result.data.token);
    } catch (error) {
      setMessage(`Помилка входу: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadAll(activeToken = token) {
    if (!activeToken) return;

    try {
      setLoading(true);

      const [cats, txs, bal] = await Promise.all([
        api('/categories', { token: activeToken }),
        api('/transactions', { token: activeToken }),
        api('/reports/balance', { token: activeToken })
      ]);

      setCategories(cats.data || []);
      setTransactions(txs.data || []);
      setBalance(bal.data || { income: 0, expense: 0, balance: 0 });
      setMessage('Дані успішно оновлено.');
    } catch (error) {
      setMessage(`Помилка завантаження даних: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function createCategory() {
    try {
      setLoading(true);

      await api('/categories', {
        method: 'POST',
        token,
        body: categoryForm
      });

      setCategoryForm({
        name: '',
        type: 'EXPENSE'
      });

      await loadAll();
      setMessage('Категорію створено.');
    } catch (error) {
      setMessage(`Помилка створення категорії: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function createTransaction() {
    try {
      setLoading(true);

      await api('/transactions', {
        method: 'POST',
        token,
        body: {
          title: transactionForm.title,
          amount: Number(transactionForm.amount),
          type: transactionForm.type,
          date: new Date(transactionForm.date).toISOString(),
          note: transactionForm.note || undefined,
          categoryId: transactionForm.categoryId
            ? Number(transactionForm.categoryId)
            : undefined
        }
      });

      setTransactionForm({
        title: '',
        amount: '',
        type: 'EXPENSE',
        date: new Date().toISOString().slice(0, 16),
        note: '',
        categoryId: ''
      });

      await loadAll();
      setMessage('Операцію додано.');
    } catch (error) {
      setMessage(`Помилка створення операції: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats() {
    try {
      setLoading(true);

      const result = await api(
        `/reports/stats?startDate=${statsRange.startDate}&endDate=${statsRange.endDate}`,
        { token }
      );

      setStats(result.data);
      setMessage('Статистику завантажено.');
    } catch (error) {
      setMessage(`Помилка статистики: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="hero">
          <div>
            <div className="pill">
              <Wallet size={14} />
              Personal Finance GUI
            </div>
            <h1>FinTrack</h1>
            <p className="hero-text">
              Personal Finance Management System
            </p>
          </div>

          <div className="status-box">
            <div className="muted">Стан</div>
            <div className="status-text">
              {loading ? 'Виконується запит...' : 'Готово до роботи'}
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <StatCard
            icon={TrendingUp}
            title="Доходи"
            value={`${Number(balance.income).toFixed(2)} ₴`}
            hint="Сумарні надходження"
          />
          <StatCard
            icon={TrendingDown}
            title="Витрати"
            value={`${Number(balance.expense).toFixed(2)} ₴`}
            hint="Сумарні витрати"
          />
          <StatCard
            icon={BarChart3}
            title="Баланс"
            value={`${Number(balance.balance).toFixed(2)} ₴`}
            hint="Поточний фінансовий результат"
          />
        </div>

        <div className="message-box">
          <strong>Повідомлення:</strong> <span>{message}</span>
        </div>

        <main className="layout">
          <section className="left-column">
            <div className="card">
              <SectionTitle
                icon={LogIn}
                title="Авторизація"
              />

              <div className="tabs">
                <button
                  className={activeTab === 'login' ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab('login')}
                >
                  Вхід
                </button>
                <button
                  className={activeTab === 'register' ? 'tab active' : 'tab'}
                  onClick={() => setActiveTab('register')}
                >
                  Реєстрація
                </button>
              </div>

              {activeTab === 'login' ? (
                <div className="form-grid">
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      placeholder="test@example.com"
                    />
                  </div>

                  <div className="field">
                    <label>Пароль</label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="******"
                    />
                  </div>

                  <button className="primary-btn" onClick={login}>
                    <LogIn size={16} />
                    Увійти
                  </button>
                </div>
              ) : (
                <div className="form-grid">
                  <div className="field">
                    <label>Ім'я</label>
                    <input
                      value={registerForm.name}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, name: e.target.value })
                      }
                      placeholder="Valera"
                    />
                  </div>

                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({ ...registerForm, email: e.target.value })
                      }
                      placeholder="test@example.com"
                    />
                  </div>

                  <div className="field">
                    <label>Пароль</label>
                    <input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          password: e.target.value
                        })
                      }
                      placeholder="12345678"
                    />
                  </div>

                  <button className="primary-btn" onClick={register}>
                    <UserPlus size={16} />
                    Зареєструватися
                  </button>
                </div>
              )}
            </div>

            <div className="card">
              <SectionTitle
                icon={Tag}
                title="Категорії"
                subtitle="Створення категорій для доходів і витрат"
              />

              <div className="form-grid">
                <div className="field">
                  <label>Назва категорії</label>
                  <input
                    value={categoryForm.name}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, name: e.target.value })
                    }
                    placeholder="Продукти"
                  />
                </div>

                <div className="field">
                  <label>Тип</label>
                  <select
                    value={categoryForm.type}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, type: e.target.value })
                    }
                  >
                    <option value="EXPENSE">EXPENSE</option>
                    <option value="INCOME">INCOME</option>
                  </select>
                </div>

                <button className="primary-btn" onClick={createCategory}>
                  Додати категорію
                </button>
              </div>

              <div className="divider" />

              <div className="chips">
                {categories.length === 0 ? (
                  <span className="muted">Ще немає категорій</span>
                ) : (
                  categories.map((item) => (
                    <span key={item.id} className="chip">
                      {item.name} · {item.type}
                    </span>
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="right-column">
            <div className="card">
              <SectionTitle
                icon={Wallet}
                title="Операції"
                subtitle="Додавання доходів і витрат користувача"
              />

              <div className="two-col">
                <div className="field">
                  <label>Назва операції</label>
                  <input
                    value={transactionForm.title}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        title: e.target.value
                      })
                    }
                    placeholder="Супермаркет"
                  />
                </div>

                <div className="field">
                  <label>Сума</label>
                  <input
                    type="number"
                    value={transactionForm.amount}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        amount: e.target.value
                      })
                    }
                    placeholder="300"
                  />
                </div>

                <div className="field">
                  <label>Тип</label>
                  <select
                    value={transactionForm.type}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        type: e.target.value,
                        categoryId: ''
                      })
                    }
                  >
                    <option value="EXPENSE">EXPENSE</option>
                    <option value="INCOME">INCOME</option>
                  </select>
                </div>

                <div className="field">
                  <label>Дата</label>
                  <input
                    type="datetime-local"
                    value={transactionForm.date}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        date: e.target.value
                      })
                    }
                  />
                </div>

                <div className="field full-width">
                  <label>Категорія</label>
                  <select
                    value={transactionForm.categoryId}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        categoryId: e.target.value
                      })
                    }
                  >
                    <option value="">Без категорії</option>
                    {filteredCategories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field full-width">
                  <label>Примітка</label>
                  <input
                    value={transactionForm.note}
                    onChange={(e) =>
                      setTransactionForm({
                        ...transactionForm,
                        note: e.target.value
                      })
                    }
                    placeholder="Необов'язково"
                  />
                </div>
              </div>

              <div className="button-row">
                <button className="primary-btn" onClick={createTransaction}>
                  Додати операцію
                </button>
                <button className="secondary-btn" onClick={() => loadAll()}>
                  <RefreshCw size={16} />
                  Оновити дані
                </button>
              </div>
            </div>

            <div className="small-grid">
              <div className="card">
                <SectionTitle
                  icon={CalendarDays}
                  title="Статистика"
                  subtitle="Аналітика за вибраний період"
                />

                <div className="form-grid">
                  <div className="field">
                    <label>Початок періоду</label>
                    <input
                      type="date"
                      value={statsRange.startDate}
                      onChange={(e) =>
                        setStatsRange({
                          ...statsRange,
                          startDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Кінець періоду</label>
                    <input
                      type="date"
                      value={statsRange.endDate}
                      onChange={(e) =>
                        setStatsRange({
                          ...statsRange,
                          endDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <button className="primary-btn" onClick={loadStats}>
                    Показати статистику
                  </button>
                </div>

                {stats && (
                  <div className="info-box">
                    <p>
                      <strong>Доходи:</strong> {Number(stats.income).toFixed(2)} ₴
                    </p>
                    <p>
                      <strong>Витрати:</strong> {Number(stats.expense).toFixed(2)} ₴
                    </p>
                    <p>
                      <strong>Баланс:</strong> {Number(stats.balance).toFixed(2)} ₴
                    </p>
                    <p>
                      <strong>Операцій:</strong> {stats.operationsCount}
                    </p>
                  </div>
                )}
              </div>

              <div className="card">
                <SectionTitle
                  icon={UserPlus}
                  title="Користувач"
                  subtitle="Поточна авторизована сесія"
                />

                <div className="info-box">
                  <p><strong>Ім'я:</strong> {user?.name || '—'}</p>
                  <p><strong>Email:</strong> {user?.email || '—'}</p>
                  <p><strong>Роль:</strong> {user?.role || '—'}</p>
                </div>

                <div className="field">
                  <label>JWT токен</label>
                  <div className="token-box">
                    {token || 'Поки що немає токена'}
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <SectionTitle
                icon={BarChart3}
                title="Історія операцій"
                subtitle="Останні транзакції користувача"
              />

              <div className="transactions-list">
                {transactions.length === 0 ? (
                  <div className="empty-box">Операцій поки немає</div>
                ) : (
                  transactions.map((item) => (
                    <div key={item.id} className="transaction-item">
                      <div>
                        <div className="transaction-top">
                          <strong>{item.title}</strong>
                          <span className="chip small-chip">{item.type}</span>
                        </div>
                        <div className="muted small-text">
                          {item.category?.name || 'Без категорії'}
                          {item.note ? ` · ${item.note}` : ''}
                        </div>
                      </div>

                      <div className="transaction-right">
                        <strong>{Number(item.amount).toFixed(2)} ₴</strong>
                        <div className="muted small-text">
                          {new Date(item.date).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}