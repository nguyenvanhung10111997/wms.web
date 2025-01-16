﻿using infrastructure.Enums;

namespace infrastructure.Models
{
    public class CRUDResult<T>
    {
        public CRUDStatusCodeRes StatusCode { get; set; }

        public string ErrorMessage { get; set; }

        public T Data { get; set; }
    }
}
