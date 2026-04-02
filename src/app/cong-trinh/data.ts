export interface ProjectItem {
    name: string;
    material: string;
}

export interface ProjectData {
    id: string;
    title: string;
    customer: string;
    location: string;
    date: string;
    area: string;
    mainImage: string;
    mainImageCaption: string;
    description: string;
    requirements: string[];
    solution: string;
    category: string;
    tags: string[];
    gallery: { src: string; caption: string }[];
    items: ProjectItem[];
    quote: string;
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
    "noi-that-chung-cu-2-phong-ngu": {
        id: "noi-that-chung-cu-2-phong-ngu",
        title: "Thi Công Trọn Gói Dự Án Căn Hộ 2 Phòng Ngủ",
        customer: "Anh Dũng",
        location: "Sơn Trà, Đà Nẵng",
        date: "10/2026",
        area: "65m2",
        mainImage: "/images/projects/chung-cu-bep.png",
        mainImageCaption: "Không gian phòng khách liền kề bếp tủ nhựa Ecoplast sạch sẽ, tối ưu diện tích.",
        description: "Gia đình anh Dũng vừa nhận bàn giao căn hộ 2 phòng ngủ diện tích vừa phải. Gia đình muốn thi công trọn gói với tiêu chí: Bền bỉ, an toàn sức khỏe cho trẻ nhỏ, và thiết kế không gian thoáng đãng.",
        requirements: [
            "Dùng nền nhựa sinh thái cao cấp Ecoplast/Vincoplast an toàn không mùi hôi.",
            "Tối ưu hóa các hệ tủ kịch trần vì không gian căn hộ chung cư khá hạn chế.",
            "Ngân sách tài chính nằm trong khoảng 80 - 100 triệu cho toàn bộ 2 phòng ngủ và 1 phòng khách bếp."
        ],
        solution: "Huy Hoàng tư vấn sử dụng nhựa cứng nhẵn bóng tông màu sáng (Trắng tinh và Vân vân gỗ sồi) giúp tạo cảm giác phòng rộng hơn. Tủ áo được tích hợp cửa lùa nhằm tiết kiệm không gian đứng.",
        category: "Combo Trọn Gói",
        tags: ["Tủ bếp chữ L", "Tủ quần áo", "Giường ngủ", "Tủ giày"],
        gallery: [
            { src: "/images/projects/chung-cu-bep.png", caption: "Bếp chữ L phủ Acrylic bóng tạo cảm giác rộng rãi" },
            { src: "/images/projects/chung-cu-tu-ao.png", caption: "Hệ tủ quần áo kịch trần bằng nhựa cao cấp" },
            { src: "/images/projects/chung-cu-giuong.png", caption: "Phòng ngủ bé với bàn học tông màu vân gỗ sáng" }
        ],
        items: [
            { name: "Tủ bếp trên & dưới", material: "Nhựa Ecoplast, Cánh Acrylic bóng gương, Phụ kiện mâm xoay inox" },
            { name: "2 Tủ quần áo kịch trần", material: "Nhựa Ecoplast màu vân gỗ tự nhiên, cửa lùa hiện đại" },
            { name: "2 Giường ngủ", material: "Giường bục nhựa ghép có ngăn kéo đa năng bên dưới" },
            { name: "Combo Bàn học & Giá sách", material: "Sử dụng ván nhựa nhập khẩu không chứa Formaldehyde" }
        ],
        quote: "Chất lượng cực kỳ tương xứng với giá tiền. Vợ chồng mình khá đắn đo giữa gỗ công nghiệp và nhựa, nhưng vì nhà có em bé hay làm đổ nước ra sàn nên thi công tủ nhựa thế này yên tâm hơn hẳn."
    },

    "tu-bep-acrylic-biet-thu": {
        id: "tu-bep-acrylic-biet-thu",
        title: "Dự Án Tủ Bếp Acrylic Sang Trọng Cho Nhà Hiện Đại",
        customer: "Chị Hạnh",
        location: "Hải Châu, Đà Nẵng",
        date: "09/2026",
        area: "Khu vực bếp 18m2",
        mainImage: "/images/projects/midrange-kitchen.png",
        mainImageCaption: "Hệ tủ bếp chữ L hiện đại thay thế cho mẫu bếp cũ tại nhà phố.",
        description: "Chị Hạnh cần nâng cấp lại toàn bộ khu vực nấu ăn ở mặt bằng tầng trệt nhà phố. Do sàn thường xuyên có các hoạt động cọ rửa, nên vật liệu làm bếp cần chịu nước 100%.",
        requirements: [
            "Phải chống nước cực mạnh, vệ sinh bằng được hóa chất tẩy rửa hằng ngày.",
            "Hệ đèn led hắt sáng dưới gầm tủ.",
            "Thiết kế bếp hiện đại, cánh acrylic trắng trơn hạn chế mảng bám mỡ."
        ],
        solution: "Sử dụng hoàn toàn cốt nhựa Ecoplast cao cấp, kết hợp bề mặt Acrylic bóng gương nhập khẩu từ Hàn Quốc, tủ bếp nhà chị mang lại vẻ đẹp tân thời, sáng bóng và cực kỳ dễ lau dọn.",
        category: "Tủ Bếp",
        tags: ["Tủ bếp chữ L", "Nhựa Ecoplast", "Bóng Gương Acrylic"],
        gallery: [
            { src: "/images/projects/midrange-kitchen.png", caption: "Mẫu tủ bếp trắng sáng, góc để máy giặt tiện lợi." }
        ],
        items: [
            { name: "Tủ bếp dưới", material: "Cốt Ecoplast chịu nước 100%, cánh phủ vân gỗ sáng màu, bản lề hơi giảm chấn." },
            { name: "Tủ bếp trên", material: "Cốt Ecoplast, Cánh Acrylic trắng bóng gương nguyên khối." },
            { name: "Đá mặt bếp", material: "Đá Vicostone nhân tạo chống thấm." }
        ],
        quote: "Bọn mình chuyên xài bếp cường độ cao, trước xài bếp gỗ mục hết chân. Giờ lắp cái bếp nhựa này thì lau chùi thoải mái, vòi nước có rỉ tý xíu dưới gầm bồn cũng chẳng lo sập tủ."
    },

    "cai-tao-bep-cu": {
        id: "cai-tao-bep-cu",
        title: "Cải Tạo Bếp Cũ Mối Mọt Thành Bếp Nhựa Hiện Đại",
        customer: "Bác Hùng",
        location: "Liên Chiểu, Đà Nẵng",
        date: "08/2026",
        area: "Khu vực bếp 12m2",
        mainImage: "/images/projects/midrange-renovation.png",
        mainImageCaption: "Mẫu bếp nhỏ dáng chữ I sau khi được cải tạo lại bằng hệ nhựa Đài Loan - Ecoplast.",
        description: "Sau nhiều năm sử dụng tổ hợp tủ bếp gỗ tự nhiên kém chất lượng, tủ nhà bác Hùng đã bị mối mọt đục khoét nghiêm trọng và xuất hiện dột sập bản lề cánh.",
        requirements: [
            "Tháo dỡ bếp gỗ cũ cẩn thận không hỏng tường.",
            "Thiết kế cấu trúc tủ chuẩn xác vào không gian nhỏ hiện hữu (chỉ vỏn vẹn gần 3m dài).",
            "Ngân sách tối giản nhưng bảo đảm về công năng và độ bền."
        ],
        solution: "Giải pháp làm lại hệ khung tủ toàn bộ bằng tấm nhựa Ecoplast tiêu chuẩn. Bề mặt nhám mờ màu vân gỗ óc chó giúp tiết kiệm chi phí dán Acrylic mà vẫn giữ được nét cổ điển, sang trọng.",
        category: "Cải Tạo & Sửa Chữa",
        tags: ["Tháo dỡ bếp cũ", "Tủ bếp chữ I", "Chống mối mọt trọn đời"],
        gallery: [
            { src: "/images/projects/midrange-renovation.png", caption: "Hệ bếp sau khi thi công gọn gàng, vuông vắn." }
        ],
        items: [
            { name: "Trọn bộ Tủ bếp chữ I", material: "Nhựa Ecoplast màu xám trắng kết hợp vân gỗ trầm." },
            { name: "Phụ kiện đi kèm", material: "Tay nắm âm nhôm, giá bát đĩa inox 304 thông minh." }
        ],
        quote: "Giá cả rất bình dân, thợ làm đúng 1 ngày rưỡi gỡ bếp cũ lắp bếp mới xong ngay sạch sẽ dọn sạch bụi, không phàn nàn chê bai. Vợ tôi cực kỳ ưng bụng về cách làm việc của xưởng."
    },

    "noi-that-phong-ngu-tre-em": {
        id: "noi-that-phong-ngu-tre-em",
        title: "Thiết Kế Phòng Ngủ Tone Trắng & Vân Gỗ Thực Tế Cho Bé",
        customer: "Anh Tuấn",
        location: "Cẩm Lệ, Đà Nẵng",
        date: "07/2026",
        area: "Phòng con: 16m2",
        mainImage: "/images/projects/chung-cu-giuong.png",
        mainImageCaption: "Bố trí góc làm việc và nghỉ ngơi an toàn từ chất liệu thân thiện.",
        description: "Gia đình anh Tuấn muốn set-up một không gian mới cho em bé chuẩn bị lên cấp 1. Cần một không gian nhẹ nhàng, sáng sủa, tạo hứng thú học tập nhưng phải ưu tiên chất liệu an toàn cháy nổ và sức khỏe.",
        requirements: [
            "Đảm bảo kết cấu tủ giường vững chắc vì trẻ con hay nhảy nhót múa hát.",
            "Màu sắc thư giãn, không làm phòng quá chói hoặc sặc sỡ màu mè.",
            "Giá sách lớn để đồ vật tiện lợi."
        ],
        solution: "Sử dụng ván nhựa siêu đặc để làm giường chống sập. Đồng thời thiết kế bàn học tích hợp luôn với giá sách cao lên tận trần với khe tủ mở giúp bé tự do trưng bày đồ dùng học tập.",
        category: "Phòng Ngủ",
        tags: ["Phòng ngủ bé", "Giường 1m4", "Bàn học dọc"],
        gallery: [
            { src: "/images/projects/chung-cu-giuong.png", caption: "Giường thiết kế liền kề góc tủ và kệ học tiện dụng." }
        ],
        items: [
            { name: "Bàn học dọc & Kệ sách", material: "Nhựa đặc Vincoplast phối màu Oak (Vân sồi sáng) nhẹ nhàng." },
            { name: "Giường ngủ cho bé 1m4", material: "Giường có 2 hộc kéo tiện lợi, nhựa Ecoplast." },
            { name: "Tủ áo bé", material: "Tủ áo 3 cánh mở phối màu đồng bộ kệ sách." }
        ],
        quote: "Mình đặc biệt thích vì sản phẩm khi nhận không bị hắc mùi keo dán công nghiệp hay mùi sơn. Ngủ đêm đầu tiên luôn cũng thấy không khí trong phòng không ngột ngạt."
    },

    "thi-cong-nha-pho-3-tang": {
        id: "thi-cong-nha-pho-3-tang",
        title: "Hoàn Thiện Nội Thất Nhà Phố 3 Tầng KĐT Hòa Xuân",
        customer: "Cô Hương",
        location: "Hòa Xuân, Cẩm Lệ",
        date: "06/2026",
        area: "Nhà phố ngang 5m",
        mainImage: "/images/projects/midrange-townhouse.png",
        mainImageCaption: "Vách ngăn nhựa cầu thang kết hợp phòng khách giả gỗ siêu thật.",
        description: "Ngôi nhà ống xây mới dài 5m cần lắp ráp đồng bộ các hạng mục thiết yếu. Nổi trội nhất là vách ngăn che cầu thang để tăng tính thẩm mỹ cho phòng khách tầng 1.",
        requirements: [
            "Hệ vách ngăn cầu thang phải thoáng mỏng nhưng không ọp ẹp.",
            "Thiết kế 3 phòng ngủ đầy đủ giường, tủ, kệ cơ bản.",
            "Giá thi công mức trung bình, ưu tiên công năng sử dụng thực tế."
        ],
        solution: "Chúng tôi áp dụng vách ngăn cột lam vuông 5v10 nhựa giả gỗ để che cầu thang tạo sự sang trọng hiện đại. Kệ tivi lắp đặt treo tường giúp sàn nhà dễ quét dọn.",
        category: "Combo Trọn Gói",
        tags: ["Nội thất nhà phố", "Vách ngăn cầu thang", "3 Phòng ngủ", "Phòng khách"],
        gallery: [
            { src: "/images/projects/midrange-townhouse.png", caption: "Vách ngăn che khuyết điểm gầm cầu thang, thiết kế đơn giản nhưng cực hiệu quả." }
        ],
        items: [
            { name: "Vách ngăn lam cầu thang", material: "Hệ thanh lam nhựa PVC phủ decal giả vân gỗ trầm." },
            { name: "Kệ tivi phòng khách", material: "Nhựa Ecoplast treo tường, màu vân gỗ Walnut." },
            { name: "Bộ nội thất 3 phòng ngủ", material: "Tủ áo 4 buồng & giường 1m8 chuẩn bằng nhựa cứng bền bỉ." }
        ],
        quote: "Nội Thất Nhựa Huy Hoàng là địa chỉ uy tín mà người nhà tôi giới thiệu. Đúng là tay nghề thợ lắp ráp vách ngăn rất khéo, thẳng tắp chứ không hề chênh phô."
    },

    "tu-ao-khong-gian-mo": {
        id: "tu-ao-khong-gian-mo",
        title: "Hệ Tủ Quần Áo Kịch Trần Thực Tế Hiện Đại",
        customer: "Anh Tài",
        location: "Ngũ Hành Sơn, Đà Nẵng",
        date: "05/2026",
        area: "Phòng ngủ 20m2",
        mainImage: "/images/projects/midrange-wardrobe.png",
        mainImageCaption: "Tủ quần áo cánh lùa viền nhôm tinh xảo, chất lượng tuyệt hảo.",
        description: "Với thiết kế phòng ngủ thiên hướng tối giản, Anh Tài muốn làm hệ cửa tủ lùa thật nhẹ, không quá hào nhoáng nhưng phải bảo đảm kín hơi, đẩy kéo thật đầm tay.",
        requirements: [
            "Kết cấu cửa lùa hiện đại không bị xệ theo thời gian.",
            "Chiều cao kịch trần 2m90.",
            "Sức ép lớn từ nhiều chăn ga mùng mền cần ván thật dày."
        ],
        solution: "Lựa chọn dòng nhựa hạng nặng kết hợp phụ kiện bản lề, ray bi lùa của Hafele. Bố trí ván viền nhôm định hình tạo độ thanh mảnh cho 3 cánh lùa kích thước lớn phi tiêu chuẩn.",
        category: "Phòng Ngủ",
        tags: ["Tủ áo hệ lùa", "Cánh nhôm lùa", "Ván nhựa hạng nặng"],
        gallery: [
            { src: "/images/projects/midrange-wardrobe.png", caption: "Trực quan tủ lùa 3 cánh viền nhôm mỏng nhẹ, tối giản không gian." }
        ],
        items: [
            { name: "Hệ tủ quần áo lùa kịch trần", material: "Thân tủ nhựa trắng tinh, kết hợp 1 khoang giữa màu vân sồi tự nhiên." },
            { name: "Ray giảm chấn", material: "Bộ ray cửa lùa treo chịu tải 80kg cực lướt, viền nhôm slim." }
        ],
        quote: "Mình rất ưng ý. Lùa bằng tay nhẹ tênh. Anh em thợ còn cố tình ngồi hẳn vào trong khoang tủ nhảy nhảy test sự chắc chắn."
    }
};
