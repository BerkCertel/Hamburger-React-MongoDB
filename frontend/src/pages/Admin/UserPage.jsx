import React, { useCallback, useEffect, useState } from "react"; // React ve gerekli hook'ları içe aktarır.
import { Table, message, Button, Popconfirm } from "antd"; // Ant Design bileşenlerini içe aktarır.
import { QuestionCircleOutlined } from "@ant-design/icons"; // Ant Design'dan ikonu içe aktarır.

function UserPage() {
  const [dataSource, setDataSource] = useState([]); // Kullanıcı verilerini tutmak için state tanımlar.
  const [loading, setLoading] = useState(true); // Yüklenme durumunu tutmak için state tanımlar.
  const apiURL = import.meta.env.VITE_API_BASE_URL; // API URL'sini alır.

  const confirm = (e) => {
    console.log(e); // Konsola e olayını yazar.
    message.success("Click on Yes"); // Başarılı mesajını gösterir.
  };

  const cancel = (e) => {
    console.log(e); // Konsola e olayını yazar.
    message.error("Click on No"); // Hata mesajını gösterir.
  };

  const columns = [
    {
      title: "Username", // Kolon başlığı
      dataIndex: "username", // Verinin çekileceği anahtar
      key: "username", // Benzersiz anahtar
    },
    {
      title: "Email", // Kolon başlığı
      dataIndex: "email", // Verinin çekileceği anahtar
      key: "email", // Benzersiz anahtar
    },
    {
      title: "Role", // Kolon başlığı
      dataIndex: "role", // Verinin çekileceği anahtar
      key: "role", // Benzersiz anahtar
    },
    {
      title: "Actions", // Kolon başlığı
      dataIndex: "actions", // Verinin çekileceği anahtar
      key: "actions", // Benzersiz anahtar
      render: (_, record) => (
        <Popconfirm
          title="Kullanıcıyı Sil" // Popconfirm başlığı
          description="Kullanıcıyı silmek istediğinize emin misiniz?" // Popconfirm açıklaması
          onCancel={cancel} // İptal edildiğinde çalışacak fonksiyon
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
          okText="Evet" // Onay metni
          cancelText="Hayır" // İptal metni
          okType="danger" // Onay tipi
          onConfirm={() => deleteUser(record.email)} // Onaylandığında çalışacak fonksiyon
        >
          <Button type="primary" style={{ padding: "0px 30px" }} danger>
            Sil
          </Button>
        </Popconfirm>
      ),
    },
  ];


  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${apiURL}/api/users`);
      setLoading(true); // Yüklenme durumunu true yapar.
      if (response.ok) {
        const data = await response.json();
        setDataSource(data); // Verileri state'e aktarır.
        console.log(data);
      } else {
        const errorData = await response.json(); // Hata mesajını alır.
        message.error(`Giriş başarısız: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Giriş hatası:", error); // Hata durumunda konsola hata mesajı yazar.
      message.error("Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin."); // Kullanıcıya hata mesajı gösterir.
    } finally {
      setLoading(false); // Yüklenme durumunu false yapar.
    }
  }, [apiURL]);

  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiURL}/api/users/${userEmail}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Kullanıcı başarıyla silindi.");
        fetchUsers(); // Kullanıcı silindikten sonra güncel verileri getirir.
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.log("Silme hatası:", error);
    }
  };

  

  useEffect(() => {
    fetchUsers(); // Bileşen yüklendiğinde kullanıcıları getirir.
  }, [fetchUsers]);


  return (
    <Table
      dataSource={dataSource} // Verileri tabloya aktarır.
      columns={columns} // Kolonları tabloya aktarır.
      rowKey={(record) => record._id} // Her satıra benzersiz bir anahtar atar.
      loading={loading} // Yüklenme durumunu tabloya aktarır.
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0 }}>{record.adress}</p>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
    />
  );
}

export default UserPage; // Bileşeni dışa aktarır.

