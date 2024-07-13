using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICloudinaryService
    {
        Task<string> UploadFileAsync(Stream fileStream, string fileName, string fileType);
        Task DeleteFileAsync(string publicId);

    }
}