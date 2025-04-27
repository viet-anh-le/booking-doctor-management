import torch
from PIL import Image
import io


def get_yolov5():
    # local best.pt
    model = torch.hub.load('./yolov5', 'custom', path='./yolov5/runs/train/exp/weights/best.pt', source='local')  # local repo
    model.conf = 0.4
    return model


from PIL import Image
import io

def get_image_from_bytes(binary_images, max_size=1024):
    """
    Hàm này nhận vào một danh sách các ảnh ở định dạng binary (bytes) và trả về một danh sách các ảnh đã được xử lý (resize).
    """
    images = []  # Danh sách chứa các ảnh đã xử lý

    for binary_image in binary_images:
        input_image = Image.open(io.BytesIO(binary_image)).convert("RGB")
        
        # Kiểm tra và thay đổi kích thước ảnh nếu cần thiết
        width, height = input_image.size
        resize_factor = min(max_size / width, max_size / height)
        resized_image = input_image.resize(
            (
                int(input_image.width * resize_factor),
                int(input_image.height * resize_factor),
            )
        )

        images.append(resized_image)

    return images
